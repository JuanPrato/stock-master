import { db } from "@/lib/db";
import { and, desc, eq, gte, like, lte, or } from "drizzle-orm";
import { orders as ordersTable, orderStates } from "@/db/schema";
import { DBOrder, DBOrderState } from "@/lib/db.type";
import { OrdersFilter } from "@/lib/api.utils";
import dayjs from "dayjs";

export type ClientOrders = Omit<DBOrder, "state" | "orderDate"> & {
  state: string;
  date: Date;
};

export async function POST(request: Request) {
  const filters = (await request.json()) as OrdersFilter;

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

  const response: { orders: ClientOrders[] } = {
    orders: dbOrders.map(({ orders, states }) => ({
      id: orders.id,
      client: orders.client,
      date: orders.orderDate ?? new Date(),
      products: orders.products,
      state: states.description,
      urgent: orders.urgent,
      total: orders.total,
    })),
  };

  return Response.json(response);
}
