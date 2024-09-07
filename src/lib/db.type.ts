import { category, inventoryLog, orders, orderStates, products } from "@/db/schema";

export type DBProduct = typeof products.$inferSelect;

export type DBCategory = typeof category.$inferSelect;

export type DBOrder = typeof orders.$inferSelect;

export type DBOrderState = typeof orderStates.$inferSelect;

export type DBInventoryLog = typeof inventoryLog.$inferSelect;