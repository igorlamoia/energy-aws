import { z } from 'zod';

export const CreateReadingSchema = z.object({
  energy_consumed: z.number().int().nonnegative(),
  current_value: z.number().int().nonnegative(),
  voltage_value: z.number().int().nonnegative(),
  start_time: z.string(),
  // .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'Invalid time'),
  end_time: z.string(),
  // .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'Invalid time'),
  id_hardware: z.number().int().positive(),
});

export type CreateReadingDto = z.infer<typeof CreateReadingSchema>;
