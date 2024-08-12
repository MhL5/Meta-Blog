import { z } from "zod";

/**
 * validating urls
 */
export const urlSchema = z.string().url();

/**
 * validating user
 */
export const userSchema = z.object({
  image: z.string(),
  name: z.string(),
  id: z.string().min(1),
});
