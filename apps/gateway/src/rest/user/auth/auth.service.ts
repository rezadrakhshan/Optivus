import { Injectable } from '@nestjs/common';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';
import { MainServiceClient } from 'src/services/main.service';
import { SendOtp } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async sendOtp(data: SendOtp) {
    const body = await this.mainSrcCli.callAction({
      provider: 'USERS',
      action: 'sendOtp',
      query: data,
    });
    return HandlerSrcCliResponse(body);
  }
}
