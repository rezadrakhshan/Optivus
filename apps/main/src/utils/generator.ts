import { Global, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class Generator {
  async generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const ttl = 2 * 60;
    return {
      otp,
      ttl,
    };
  }
}
