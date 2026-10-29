import { Injectable } from '@nestjs/common';
import { HandlerSrcCliResponse } from 'src/response/http_exception.filter';
import { MainServiceClient } from 'src/services/main.service';
import { CreateLeadDto, UpdateLeadDto } from './dtos';

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

  async updateLead(data: UpdateLeadDto, req, id: string) {
    const dto = { data, id: req.user.id, leadID: id };
    const result = await this.mainSrcCli.callAction({
      provider: 'LEAD',
      action: 'updateLead',
      query: dto,
    });

    return HandlerSrcCliResponse(result);
  }

  async getAllLeads(req) {
    const result = await this.mainSrcCli.callAction({
      provider: 'LEAD',
      action: 'getAllLeads',
      query: req.user.id,
    });
    return HandlerSrcCliResponse(result);
  }

  async getLeadDetail(req, id: string) {
    const dto = { id, userID: req.user.id };
    const result = await this.mainSrcCli.callAction({
      provider: 'LEAD',
      action: 'getLeadDetail',
      query: dto,
    });

    return HandlerSrcCliResponse(result);
  }

  async removeLead(id: string, req) {
    const dto = { id, userID: req.user.id };
    const result = await this.mainSrcCli.callAction({
      provider: 'LEAD',
      action: 'removeLead',
      query: dto,
    });
    return HandlerSrcCliResponse(result);
  }
}
