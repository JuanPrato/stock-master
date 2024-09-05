import { ClientOrders } from "@/app/api/orders/route";

export async function getOrders(): Promise<ClientOrders[]> {
  const orders = await fetch("http://localhost:3000/api/orders").then((r) =>
    r.json()
  );

  return orders.orders;
}
