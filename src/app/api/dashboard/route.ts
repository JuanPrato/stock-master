import { orders as ordersTable, products as productsTable } from "@/db/schema";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import { gte } from "drizzle-orm";

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
};

export async function GET() {
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

  return Response.json({ stats });
}
