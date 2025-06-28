import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Residence, ResidenceSchema } from './residence.schema';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true, collection: 'customers' })
export class Customer {
  @Prop({ unique: true, index: true })
  cpf_cnpj: string;

  @Prop()
  name: string;

  @Prop({ unique: true, sparse: true, index: true })
  email: string;

  @Prop()
  mobile_phone: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ type: [ResidenceSchema], default: [] })
  residences: Residence[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
