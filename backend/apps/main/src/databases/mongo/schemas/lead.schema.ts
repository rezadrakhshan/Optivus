import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { LeadStatus } from '../enums/status.enum';
import { LeadTag } from '../enums/tag.enum';
import { LeadType } from '../enums/type.enum';
import { Category } from './category.schema';

export type LeadDocument = mongoose.HydratedDocument<Lead>;

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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
