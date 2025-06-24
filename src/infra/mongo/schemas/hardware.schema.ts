import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Hardware {
  @Prop()
  id!: string;

  @Prop()
  firmware_version!: string;

  @Prop()
  hardware_version!: string;

  @Prop()
  nickname!: string;
}

export const HardwareSchema = SchemaFactory.createForClass(Hardware);
