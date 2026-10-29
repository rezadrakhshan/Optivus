import { HttpStatus, Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/databases/redis/redis.service';
import { ServiceResponseData, SrvError } from 'src/services/dto';
import { Generator } from 'src/utils/generator';
import { Repository } from 'typeorm';
import { User } from 'src/databases/postgres/entities/user/user.entity';
import { Profile } from 'src/databases/postgres/entities/user/profile.entity';
import { MessageSender } from 'src/utils/message-sender';

@Injectable()
export class UserService {
  private static readonly role = 'USERS';
  constructor(
    private readonly generator: Generator,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly msgSender: MessageSender,
    @Inject('USER_REPOSITORY')
    private readonly userRepo: Repository<User>,
    @Inject('PROFILE_REPOSITORY')
    private readonly profileRepo: Repository<Profile>,
  ) {}
  async sendOtp(data) {
    const { phone } = data.query;
    const key = `${UserService.role}:${phone}`;
    const existing = await this.redisService.cacheCli.get(key);
    if (existing)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Otp already sent');
    const otp = await this.generator.generateOtp();
    await this.redisService.cacheCli.set(key, otp.otp, 'EX', otp.ttl);
    await this.msgSender.sendOtp(otp.otp, phone);
    return {
      message: 'Otp send successfully',
      success: true,
      otp: otp.otp,
      phone,
      expiresIn: otp.ttl,
    };
  }

  async verifyOtp(data) {
    const { phone, code } = data.query;
    const key = `${UserService.role}:${phone}`;
    const existing = await this.redisService.cacheCli.get(key);
    if (!existing || existing != code)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Invalid code');
    await this.redisService.cacheCli.del(key);
    let user: any = await this.userRepo.findOne({ where: { phone } });
    if (!user) {
      user = await this.userRepo.create({ phone });
      await this.userRepo.save(user);
    }
    let profile = await this.profileRepo.findOne({ where: { user } });
    if (!profile) {
      profile = await this.profileRepo.create({ user });
      await this.profileRepo.save(profile);
    }
    const payload = { id: user.id };
    return {
      message: 'Phone number verified',
      success: true,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
