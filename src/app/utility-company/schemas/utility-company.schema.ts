import { z } from 'zod';

export const UtilityCompanySchema = z.object({
  name: z.string(),
  id_state: z.number().int(),
  standard_rate: z.number().int(),
  off_peak_rate: z.number().int(),
  peak_rate: z.number().int(),
  intermediate_rate: z.number().int(),
  end_first_intermediate_time: z.number().int().optional(),
  end_second_intermediate_time: z.number().int().optional(),
  end_peak_time: z.number().int().optional(),
  start_first_intermediate_time: z.number().int().optional(),
  start_second_intermediate_time: z.number().int().optional(),
  start_peak_time: z.number().int().optional(),
});

export type UtilityCompanyDto = z.infer<typeof UtilityCompanySchema>;
