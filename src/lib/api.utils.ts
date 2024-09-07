import { ClientOrders } from "@/app/api/orders/route";
import {DBProduct} from "@/lib/db.type";

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
    next: {
      tags: ["orders"]
    }
  }).then((r) => r.json());

  return orders.orders;
}

export interface ProductsFilter {
  query?: string;
  category?: string;
  from?: string;
  to?: string;
}

export async function getProducts(filters: ProductsFilter): Promise<DBProduct[]> {
  const products = await fetch("http://localhost:3000/api/products", {
    method: "POST",
    body: JSON.stringify(filters),
    next: {
      tags: ["products"]
    }
  }).then((r) => r.json());

  return products.products;
}
