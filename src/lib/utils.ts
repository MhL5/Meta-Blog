import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
