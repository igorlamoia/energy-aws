import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReadingDocument = Reading & Document;

@Schema({ collection: 'readings' })
export class Reading {
  @Prop({ type: Number  })
  id_residence!: number;

  @Prop()
  energy_consumed!: number;

  @Prop()
  current_value!: number;

  @Prop()
  voltage_value!: number;

  @Prop({ type: Date  })
  start_time!: Date;

  @Prop({ type: Date })
  end_time!: Date;

  @Prop({ type: Number })
  id_utility_company!: number;

  @Prop({ type: Number })
  id_state!: number;
}

const ReadingSchema = SchemaFactory.createForClass(Reading);
ReadingSchema.index({ id_utility_company: 1, start_time: -1, end_time: -1 });
ReadingSchema.index({ id_state: 1, start_time: -1, end_time: -1 });
ReadingSchema.index({ id_residence: 1, start_time: -1, end_time: -1 });
export {ReadingSchema};
