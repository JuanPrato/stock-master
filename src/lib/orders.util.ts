import { DBOrder } from "@/lib/db.type";
import { OrdersFilter } from "@/lib/api.utils";
import { and, desc, eq, gte, like, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { orders as ordersTable, orderStates } from "@/db/schema";
import dayjs from "dayjs";

export type ClientOrders = Omit<DBOrder, "state" | "orderDate"> & {
  state: string;
  date: Date;
};

async function getOrdersWithOutCache(filters: OrdersFilter): Promise<ClientOrders[]> {

  const wheres = [];

  if (filters.client) {
    wheres.push(like(ordersTable.client, `%${filters.client}%`));
  }

  if (filters.from) {
    wheres.push(gte(ordersTable.orderDate, dayjs(filters.from).toDate()));
  }

  if (filters.to) {
    wheres.push(lte(ordersTable.orderDate, dayjs(filters.to).toDate()));
  }

  if (filters.state) {
    wheres.push(eq(ordersTable.state, filters.state));
  }

  if (filters.urgent) {
    wheres.push(eq(ordersTable.urgent, true));
  }

  const dbOrders = await db
    .select()
    .from(ordersTable)
    .innerJoin(orderStates, eq(ordersTable.state, orderStates.id))
    .where(and(...wheres))
    .orderBy(desc(ordersTable.orderDate));

  return dbOrders.map(({ orders, states }) => ({
    id: orders.id,
    client: orders.client,
    date: orders.orderDate ?? new Date(),
    products: orders.products,
    state: states.description,
    urgent: orders.urgent,
    total: orders.total,
  }));
}

export const getOrders = unstable_cache(getOrdersWithOutCache, ["orders"], { tags: ["orders"] })