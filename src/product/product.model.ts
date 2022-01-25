import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  price: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
