import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ collection: 'logs' })
export class Log {
  @Prop({ type: String, index: true })
  route!: string;

  @Prop()
  request_type!: string;

  @Prop()
  request_body!: string;

  @Prop()
  response_body!: string;

  @Prop({ type: Date, default: Date.now })
  request_timestamp!: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
