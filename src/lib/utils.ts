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

/**
 * Truncates the given text string to the specified limit, appending '...' if it exceeds the limit.
 */
export function truncateText(str: string, limit = 100) {
  return str.length > limit ? str.slice(0, limit) + "..." : str;
}
