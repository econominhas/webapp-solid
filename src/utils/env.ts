import { z } from "zod";

const envSchema = z.object({
  VITE_GOOGLE_AUTH_URL: z.string().url().trim().min(1),
  VITE_FACEBOOK_AUTH_URL: z.string().url().trim().min(1),
});

export const env = envSchema.parse(import.meta.env);
