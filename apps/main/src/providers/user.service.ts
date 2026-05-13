import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/databases/redis/redis.service';
import { SrvError } from 'src/services/dto';
import { Generator } from 'src/utils/generator';

@Injectable()
export class UserService {
  private static readonly role = 'USERS';
  constructor(
    private readonly generator: Generator,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}
  async sendOtp(data) {
    const { phone } = data.query;
    const key = `${UserService.role}:${phone}`;
    const existing = await this.redisService.cacheCli.get(key);
    if (existing)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Otp already sent');
    const otp = await this.generator.generateOtp();
    await this.redisService.cacheCli.set(key, otp.otp, 'EX', otp.ttl);
    return {
      data: {
        message: 'Otp send successfuly',
        success: true,
        otp: otp.otp,
        phone,
        expiresIn: otp.ttl,
      },
    };
  }

  async verifyOtp(data) {
    const { phone, code } = data.query;
    const key = `${UserService.role}:${phone}`;
    const existing = await this.redisService.cacheCli.get(key);
    if (!existing || existing != code)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Invalid code');
    await this.redisService.cacheCli.del(key);
    const payload = { phone };
    return {
      data: {
        message: 'Phone number verfied',
        success: true,
        token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
