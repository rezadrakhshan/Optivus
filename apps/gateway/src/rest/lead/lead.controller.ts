import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LeadService } from './lead.service';
import { Request } from 'express';
import { CreateLeadDto } from './dtos';

@ApiBearerAuth()
@ApiTags('Lead')
@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  @ApiOperation({ summary: 'Create lead endpoint' })
  async createLead(@Body() data: CreateLeadDto, @Req() req: Request) {
    return this.leadService.createLead(data, req);
  }
}
