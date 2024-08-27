import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  stock: integer("stock").notNull().default(0),
  creationDate: integer("creation_date", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  modifyDate: integer("modify_date", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
});
