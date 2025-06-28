import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UtilityCompanyDocument = UtilityCompany & Document;

@Schema({ timestamps: true, collection: 'utility_company' })
export class UtilityCompany {
  @Prop({ type: Number, unique: true, index: true })
  id!: number;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  standard_rate!: number;

  @Prop()
  off_peak_rate?: number;

  @Prop()
  peak_rate?: number;

  @Prop()
  intermediate_rate?: number;

  @Prop()
  start_peak_time?: number;

  @Prop()
  end_peak_time?: number;

  @Prop()
  start_first_intermediate_time?: number;

  @Prop()
  end_first_intermediate_time?: number;

  @Prop()
  start_second_intermediate_time?: number;

  @Prop()
  end_second_intermediate_time?: number;
}

export const UtilityCompanySchema = SchemaFactory.createForClass(UtilityCompany);
