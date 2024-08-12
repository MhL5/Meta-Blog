import { z } from "zod";

/**
 * zod schema for validating urls
 */
export const urlSchema = z.string().url();
