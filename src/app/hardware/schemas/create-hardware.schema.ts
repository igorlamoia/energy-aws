import { z } from 'zod';

export const HardwareSchema = z.object({
  id: z.number().int().optional(),
  firmware_version: z.string().max(20),
  hardware_version: z.string().max(20),
  nickname: z.string().max(255).optional(),
  id_residence: z.number().int(),
});

export type HardwareDto = z.infer<typeof HardwareSchema>;
