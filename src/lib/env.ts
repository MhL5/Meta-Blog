import { z } from "zod";

/**
 * The Zod schema for validating environment variables.
 * Public environment are not useable in client components and results in zod Error we only write them here as a reference
 * we have to use process.env for public environments
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
  GOOGLE_RECAPTCHA_SECRET: z.string().min(1),
  // cloudinary
  CLOUDINARY_URL: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  // PUBLIC ENV: these are not available in client components and results in zod Error we only write them here as a reference
  NEXT_PUBLIC_APPLICATION_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
});

/**
 * Parses the environment variables according to the schema and exports them.
 */
export const env = envSchema.parse(process.env);
