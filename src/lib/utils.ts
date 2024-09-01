import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseErrors(error: z.ZodError<FormData>) {
  return error.errors.reduce((acc, err) => {
    acc[err.path[0]] = err.message;
    return acc;
  }, {} as any);
}
