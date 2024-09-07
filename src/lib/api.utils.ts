import { ClientOrders } from "@/app/api/orders/route";

export interface OrdersFilter {
  client?: string;
  from?: string;
  to?: string;
  state?: number;
  urgent?: string;
}

export async function getOrders(
  filters: OrdersFilter
): Promise<ClientOrders[]> {
  const orders = await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    body: JSON.stringify(filters),
  }).then((r) => r.json());

  return orders.orders;
}
