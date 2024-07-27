import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random UUID (Universally Unique Identifier).
 * @returns {string} A randomly generated UUID string.
 * ### Only works in server components ( node crypto module does not work in browser )
 */
export function UUIDGenerator(): string {
  return crypto.randomUUID();
}

/**
 * Truncates the given text string to the specified limit, appending '...' if it exceeds the limit.
 */
export function truncateText(str: string, limit = 100) {
  // if we don't remove code blocks from markdown it will overflow
  const withoutTripleBackticks = str.replace(/```[\s\S]*?```/g, "");

  return withoutTripleBackticks.length > limit
    ? withoutTripleBackticks.slice(0, limit) + "..."
    : withoutTripleBackticks + "...";
}

/**
 * zod schema for validating urls
 */
export const urlSchema = z.string().url();

/**
 * Slugify
 * generate a slug from a string and adds a random string to avoid duplicates using crypto.
 *
 * @example
 * slugify('My New Post') returns 'my-new-post-07a85ca32ff56498'
 */
export function slugify(str: string): string {
  return `${str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${crypto.randomBytes(8).toString("hex")}`;
}
