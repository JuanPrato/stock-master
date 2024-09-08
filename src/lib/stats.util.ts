import { OrdersFilter } from "@/lib/api.utils";
import { unstable_cache } from "next/cache";
import { category, inventoryLog, orders as ordersTable, products as productsTable } from "@/db/schema";
import dayjs from "dayjs";
import { db } from "@/lib/db";
import { desc, gte } from "drizzle-orm";

export type DashboardGetResponse = {
  stats: {
    total: number;
    totalImproved: number;
    low: number;
    day: number;
    dayUrgent: number;
    totalValue: number;
    totalValueImproved: number;
  };
  inventory: (Omit<typeof inventoryLog.$inferSelect, "id" | "saveDate"> & {
    date: Date;
  })[];
  categories: { id: number; description: string }[];
};


export async function getDashboardStatsWithOutCache(): Promise<DashboardGetResponse> {
  const today = dayjs().startOf("day");

  const products = await db.select().from(productsTable);
  const orders = await db
    .select()
    .from(ordersTable)
    .where(gte(ordersTable.orderDate, today.toDate()));

  const stats: DashboardGetResponse["stats"] = {
    total: products.length,
    totalImproved: 0,
    low: 0,
    day: orders.length,
    dayUrgent: 0,
    totalValue: 0,
    totalValueImproved: 0,
  };

  products.forEach((product) => {
    if (product.stock < product.stockLimit) {
      stats.low++;
    }

    stats.totalValue = stats.totalValue + product.price * product.stock;
  });

  orders.forEach((order) => {
    if (order.urgent) stats.dayUrgent++;
  });

  const inventoryMoves = await db
    .select()
    .from(inventoryLog)
    .limit(3)
    .orderBy(desc(inventoryLog.saveDate));

  const inventoryRecent: DashboardGetResponse["inventory"] = inventoryMoves.map(
    (move) => ({
      type: move.type,
      product: move.product,
      quantity: move.quantity,
      date: move.saveDate,
    })
  );

  const categories = await db.select().from(category);

  return {
    stats,
    inventory: inventoryRecent,
    categories: categories,
  };
}