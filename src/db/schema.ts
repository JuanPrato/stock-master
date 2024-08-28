import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  price: real("price").notNull().default(0),
  stock: integer("stock").notNull().default(0),
  stockLimit: integer("stock_limit").notNull().default(5),
  creationDate: integer("creation_date", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
  modifyDate: integer("modify_date", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
});

export const orderStates = sqliteTable("states", {
  id: integer("id").primaryKey(),
  description: text("description").notNull().unique(),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderDate: integer("order_date", { mode: "timestamp" }).default(
    sql`(unixepoch())`
  ),
  state: integer("state").references(() => orderStates.id),
  total: real("total").notNull().default(0),
  products: text("products", { mode: "json" })
    .notNull()
    .$type<{ product: string; quantity: number; price: number }[]>(),
  urgent: integer("urgent", { mode: "boolean" }).default(false),
});

export const inventoryLog = sqliteTable("inventory_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  product: text("product").notNull(),
  type: text("type", { enum: ["entry", "out", "update"] }),
  quantity: integer("quantity").notNull(),
  saveDate: integer("save_date", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
