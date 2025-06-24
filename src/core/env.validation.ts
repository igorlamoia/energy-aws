import { z } from 'zod';

const DEFAULT_PORT = 3000;

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(DEFAULT_PORT),
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL must be a valid URL',
  }),
  PRIVATE_KEY: z.string(),
  PUBLIC_KEY: z.string(),
  DATABASE_URL_MONGO: z.string().url({
    message: 'DATABASE_URL_MONGO must be a valid URL',
  }),
});

export type Env = z.infer<typeof envSchema>;
