import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
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

export function formatMoney(v: number) {
  const formatter = new Intl.NumberFormat("es-AR", {
    currency: "ARS",
    style: "currency",
  });

  return formatter.format(v);
}

export function formatDate(date: Date) {
  const d = dayjs(date);

  return d.format("DD/MM/YYYY");
}
