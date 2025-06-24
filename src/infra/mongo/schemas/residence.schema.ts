// src/customer/schemas/residence.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Hardware, HardwareSchema } from './hardware.schema';
import { State, StateSchema } from './state.schema';

@Schema({ _id: false })
export class Residence {
  @Prop()
  id!: string;

  @Prop()
  nickname!: string;

  @Prop()
  street!: string;

  @Prop()
  number!: number;

  @Prop()
  complement!: string;

  @Prop()
  neighborhood!: string;

  @Prop()
  city!: string;

  @Prop()
  postal_code!: string;

  @Prop()
  id_state!: number;

  @Prop({ type: StateSchema })
  state!: State;

  @Prop()
  id_utility_company!: number;

  @Prop({ type: [HardwareSchema], default: [] })
  hardware!: Hardware[];
}

export const ResidenceSchema = SchemaFactory.createForClass(Residence);
