import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Lead } from './lead.schema';
import { ActivityType } from '../enums/activity-type.enum';

export type ActivityDocument = mongoose.HydratedDocument<Activity>;

@Schema({
  timestamps: true,
})
export class Activity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true })
  leadID: Lead;
 
  @Prop({ required: true, enum: ActivityType })
  type: ActivityType;

  @Prop({ required: true, type: String })
  description: string;
  @Prop({ type: Object, required: true })
  metadata: object;
  @Prop({ rqeuired: true, type: String })
  createdBy: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
