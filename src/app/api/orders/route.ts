import { db } from "@/lib/db";
import { eq, or } from "drizzle-orm";
import { orders as ordersTable, orderStates } from "@/db/schema";
import { DBOrder, DBOrderState } from "@/lib/db.type";

export type ClientOrders = Omit<DBOrder, "state" | "orderDate"> & {
  state: string;
  date: Date;
};

export async function GET() {
  const dbOrders = await db
    .select()
    .from(ordersTable)
    .innerJoin(orderStates, eq(ordersTable.state, orderStates.id));

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
