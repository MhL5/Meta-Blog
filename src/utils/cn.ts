import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * this function handles tailwind classes merging
 * last string overwrites the string that comes before it
 *
 * @example
 * for building reusable components:
 * cn("default styles", props.className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
