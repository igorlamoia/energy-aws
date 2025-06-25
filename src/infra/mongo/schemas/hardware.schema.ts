import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Hardware {
  @Prop({ unique: true, index: true })
  id!: number;

  @Prop()
  firmware_version!: string;

  @Prop()
  hardware_version!: string;

  @Prop()
  nickname!: string;
}

export const HardwareSchema = SchemaFactory.createForClass(Hardware);
