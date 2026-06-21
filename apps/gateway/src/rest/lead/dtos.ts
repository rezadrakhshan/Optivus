import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
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
  status!: LeadStatus;
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
  @IsOptional()
  @IsNumber()
  nextFollowUp?: Number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'This is a sample note',
  })
  note?: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '6a36e978408a73b81a9de811',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;
}

export class UpdateLeadDto extends PartialType(CreateLeadDto) {}
