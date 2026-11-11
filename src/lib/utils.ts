import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combines Tailwind class names and resolves conflicts (used by every shadcn component). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
