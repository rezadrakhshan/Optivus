import { Injectable } from '@nestjs/common';
import { MainServiceClient } from 'src/services/main.service';
import { UpdateProfileDto } from './dtos';
import { Request } from 'express';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';

@Injectable()
export class ProfileService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async updateProfile(data: UpdateProfileDto, req, image) {
    const dto = { data, id: req.user.id, profile: image };
    const body = await this.mainSrcCli.callAction({
      provider: 'PROFILE',
      action: 'updateProfile',
      query: dto,
    });

    return HandlerSrcCliResponse(body);
  }

  async getProfile(req) {
    const data = await this.mainSrcCli.callAction({
      provider: 'PROFILE',
      action: 'getProfile',
      query: req.user.id,
    });
    return HandlerSrcCliResponse(data);
  }
}
