import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LeadStatus } from '../enums/status.enum';
import { LeadTag } from '../enums/tag.enum';
import { LeadType } from '../enums/type.enum';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true, unique: true })
  trackingCode!: number;
  @Prop({ required: true, enum: LeadType })
  type!: LeadType;
  @Prop({ required: true, enum: LeadStatus })
  status!: LeadStatus;
  @Prop({ required: true, enum: LeadTag })
  tag!: LeadTag;
  @Prop({ type: Date })
  nextFollowUp?: Date;
  @Prop({ type: String })
  notes?: string;
  @Prop({ required: true })
  assignedUserID!: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
