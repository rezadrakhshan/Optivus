import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LeadStatus, LeadTag, LeadType } from './enums';

export class CreateLeadDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: 123456,
  })
  @IsNotEmpty()
  @IsNumber()
  trackingCode!: number;

  @ApiProperty({
    enum: LeadType,
    enumName: 'LeadType',
    required: true,
  })
  type!: LeadType;
  @ApiProperty({
    enum: LeadStatus,
    enumName: 'LeadStatus',
    required: true,
  })
  stauts!: LeadStatus;
  @ApiProperty({
    enum: LeadTag,
    enumName: 'LeadTag',
    required: true,
  })
  tag!: LeadTag;

  @ApiProperty({
    required: false,
    type: Date,
    example: '',
  })
  nextFollowUp?: Date;

  @ApiProperty({
    type: String,
    required: false,
    example: 'This is a sample note',
  })
  note?: string;
}
