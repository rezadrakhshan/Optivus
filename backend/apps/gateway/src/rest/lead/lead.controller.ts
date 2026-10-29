import {
  Body,
  Controller,
  Post,
  Req,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LeadService } from './lead.service';
import { Request } from 'express';
import { CreateLeadDto, UpdateLeadDto } from './dtos';

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

  @Put(':id')
  @ApiOperation({ summary: 'Update lead endpoint' })
  async updateLead(
    @Body() data: UpdateLeadDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.leadService.updateLead(data, req, id);
  }

  @Get()
  @ApiOperation({ summary: 'Get List of leads' })
  async getAllLead(@Req() req: Request) {
    return this.leadService.getAllLeads(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead detail' })
  async getLeadDetail(@Req() req: Request, @Param('id') id: string) {
    return this.leadService.getLeadDetail(req, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove lead with id' })
  async removeLead(@Param('id') id: string, @Req() req: Request) {
    return this.leadService.removeLead(id, req);
  }
}
