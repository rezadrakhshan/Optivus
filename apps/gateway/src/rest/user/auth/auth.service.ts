import { Injectable } from '@nestjs/common';
import { MainServiceClient } from 'src/services/main.service';

@Injectable()
export class AuthService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async test() {
    const data = await this.mainSrcCli.callAction({
      provider: 'USERS',
      action: 'test',
      query: [],
    });
    return data;
  }
}
