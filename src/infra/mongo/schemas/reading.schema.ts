import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReadingDocument = Reading & Document;

@Schema({ collection: 'readings' })
export class Reading {
  @Prop({ type: String, index: true })
  id_hardware!: string;

  @Prop({ type: String, index: true })
  id_residence!: string;

  @Prop({ type: String, index: true })
  id_customer!: string;

  @Prop()
  energy_consumed!: number;

  @Prop()
  current_value!: number;

  @Prop()
  voltage_value!: number;

  @Prop({ type: Date, index: true })
  start_time!: Date;

  @Prop({ type: Date, index: true })
  end_time!: Date;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
