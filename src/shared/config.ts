import z from 'zod';

const ConfigSchema = z.object({
  VITE_API_URL: z.string(),
  BASE_URL: z.string(),
  DEV: z.boolean(),
  PROD: z.boolean(),
});

export const privateConfig = ConfigSchema.parse(import.meta.env);
