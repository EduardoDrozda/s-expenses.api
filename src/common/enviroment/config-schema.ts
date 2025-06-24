import { z } from 'zod';

export const envSchema = z.object({
  APP_PORT: z.coerce.number().default(8081),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  DB_CONNECTION: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_URL: z.string(),
  HASH_ROUNDS: z.coerce.number(),
  STORAGE_PROVIDER: z.enum(['local', 's3', 'gcs']).default('local'),
  STORAGE_ENDPOINT: z.string().default('http://localhost:9000'),
  STORAGE_ACCESS_KEY_ID: z.string(),
  STORAGE_SECRET_ACCESS_KEY: z.string(),
  STORAGE_BUCKET: z.string(),
  STORAGE_CREDENTIALS_FILE: z.string().optional(),
}).refine((data) => {
  if (data.STORAGE_PROVIDER !== 'local' || data.NODE_ENV === 'production') {
    return !!data.STORAGE_CREDENTIALS_FILE;
  }

  return true;
}, {
  message: 'STORAGE_CREDENTIALS_FILE is required for non-local storage providers in production',
  path: ['STORAGE_CREDENTIALS_FILE'],
});



export type EnvSchema = z.infer<typeof envSchema>;

export const validate = (config: Record<string, unknown>) => envSchema.parse(config)