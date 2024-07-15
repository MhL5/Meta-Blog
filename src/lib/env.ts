import { z } from "zod";

/**
 * The Zod schema for validating environment variables.
 */
const envSchema = z.object({
  // NEXT-AUTH KEYS:
  AUTH_SECRET: z.string().min(1),
  // next-auth google
  AUTH_GOOGLE_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  // next-auth github:
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  // Mongodb atlas KEY:
  DATABASE_URL: z.string().min(1),
  // RECAPTCHA KEYS:
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  GOOGLE_RECAPTCHA_SECRET: z.string().min(1),
  // cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_URL: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

/**
 * Parses the environment variables according to the schema and exports them.
 */
export const env = envSchema.parse(process.env);
