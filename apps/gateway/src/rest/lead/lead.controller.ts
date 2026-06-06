import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LeadService } from './lead.service';

@ApiTags('Lead')
@Controller('Lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}
}
