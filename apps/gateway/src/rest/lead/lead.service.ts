import { Injectable } from '@nestjs/common';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';
import { MainServiceClient } from 'src/services/main.service';
import { CreateLeadDto } from './dtos';

@Injectable()
export class LeadService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async createLead(data: CreateLeadDto, req) {
    const dto = { data, id: req.user.id };
    const result = await this.mainSrcCli.callAction({
      provider: 'LEAD',
      action: 'createLead',
      query: dto,
    });
    return HandlerSrcCliResponse(result);
  }
}
