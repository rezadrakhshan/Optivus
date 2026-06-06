import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

@Module({
  imports: [],
  controllers: [LeadController],
  providers: [LeadService],
})
export class LeadModule {}
