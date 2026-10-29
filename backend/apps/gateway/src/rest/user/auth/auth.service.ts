import { Injectable } from '@nestjs/common';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';
import { MainServiceClient } from 'src/services/main.service';
import { SendOtpDto, VerifyOtpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async sendOtp(data: SendOtpDto) {
    const result = await this.mainSrcCli.callAction({
      provider: 'USERS',
      action: 'sendOtp',
      query: data,
    });
    
    return HandlerSrcCliResponse(result);
  }

  async verifyOtp(data: VerifyOtpDto) {
    const result = await this.mainSrcCli.callAction({
      provider: 'USERS',
      action: 'verifyOtp',
      query: data,
    });

    return HandlerSrcCliResponse(result);
  }
}
