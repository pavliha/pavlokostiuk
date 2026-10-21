import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inlineLink =
  "text-primary dark:text-brand-light hover:text-brand-strong underline underline-offset-4"
