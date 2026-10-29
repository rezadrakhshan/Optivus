import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    required: true,
    maxLength: 100,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
  })
  slug: string;
  @Prop({
    type: String,
    required: true,
  })
  createdBy: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
