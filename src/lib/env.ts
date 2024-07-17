import { z } from "zod";

/**
 * The Zod schema for validating environment variables.
 * Public environment are not useable in client components and results in zod Error we only write them here as a reference
 * we have to use process.env for public environments
 */
const publicEnvErrorMessage =
  "next public environment variables are not accessible in client components WITH ZOD schema, only in server components,use process.env instead";
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
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z
    .string({
      message: publicEnvErrorMessage,
    })
    .min(1),
  GOOGLE_RECAPTCHA_SECRET: z.string().min(1),
  // cloudinary
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z
    .string({
      message: publicEnvErrorMessage,
    })
    .min(1),
  CLOUDINARY_URL: z.string().min(1),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z
    .string({
      message: publicEnvErrorMessage,
    })
    .min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  // application domain
  NEXT_PUBLIC_APPLICATION_DOMAIN: z
    .string({
      message: publicEnvErrorMessage,
    })
    .min(1),
});

/**
 * Parses the environment variables according to the schema and exports them.
 */
export const env = envSchema.parse(process.env);
