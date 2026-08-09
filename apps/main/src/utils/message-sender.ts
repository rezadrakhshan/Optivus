import { Global, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as config from 'config';

const cfg: any = config.get('msg');

@Global()
@Injectable()
export class MessageSender {
  async sendOtp(otp: string, phone: string) {
    const config = {
      method: 'POST',
      url: 'https://api.sms.ir/v1/send/verify',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'x-api-key': cfg.apiKey,
      },
      data: {
        mobile: phone,
        templateId: '341054',
        parameters: [
          {
            name: 'CODE',
            value: otp.toString(),
          },
        ],
      },
    };

    try {
      const response = await axios(config);

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message);

      throw error;
    }
  }
}
