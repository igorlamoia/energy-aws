import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.number().optional(),
  cpf_cnpj: z.string().min(11).max(14).regex(/^\d+$/),
  name: z.string(),
  email: z.string().email().optional(),
  mobile_phone: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type CustomerDto = z.infer<typeof CustomerSchema>;
