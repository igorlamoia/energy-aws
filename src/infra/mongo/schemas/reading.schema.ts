import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReadingDocument = Reading & Document;

@Schema({ collection: 'readings' })
export class Reading {
  @Prop({ type: Number , index: true })
  id_hardware!: number;

  @Prop()
  energy_consumed!: number;

  @Prop()
  current_value!: number;

  @Prop()
  voltage_value!: number;

  @Prop({ type: Date })
  start_time!: Date;

  @Prop({ type: Date })
  end_time!: Date;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
ReadingSchema.index({ id_hardware: 1, start_time: -1, end_time: -1 });
