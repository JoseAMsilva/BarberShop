import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16).default('development_secret_do_not_use_in_prod'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  CORS_ORIGINS: z.string().transform((val) => val.split(',')).default('*'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  throw new Error('Ambiente inválido');
}

export const env = Object.freeze(_env.data);
