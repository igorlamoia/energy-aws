import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, collection: 'states' })
export class State {
  @Prop()
  id!: number;

  @Prop()
  name!: string;

  @Prop()
  abbreviation!: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
