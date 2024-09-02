import { category, products } from "@/db/schema";

export type DBProduct = typeof products.$inferSelect;

export type DBCategory = typeof category.$inferSelect;
