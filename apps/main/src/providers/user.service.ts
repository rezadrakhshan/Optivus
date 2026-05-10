import { HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from 'src/databases/redis/redis.service';
import { SrvError } from 'src/services/dto';
import { Generator } from 'src/utils/generator';

@Injectable()
export class UserService {
  private static readonly role = 'USERS';
  constructor(
    private readonly generator: Generator,
    private readonly redisService: RedisService,
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
      message: 'Otp send successfuly',
      data: {
        success: true,
        otp: otp.otp,
        phone,
        expiresIn: otp.ttl,
      },
    };
  }
}
