import { ClientOrders } from "@/app/api/orders/route";
import { DBInventoryLog, DBProduct } from "@/lib/db.type";

const host = process.env.NEXT_PUBLIC_URL;

async function GET(path: string, tag?: string) {
  console.log("GET TO: ", `${host}/api/${path}`);
  const resp = await fetch(`${host}/api/${path}`, {
    next:{
      tags: tag ? [tag] : undefined
    }
  });

  if (!resp.ok) {
    throw new Error(`Error calling ${path}`);
  }

  return resp.json();
}

async function POST(path: string, body: any, tag?: string) {
  console.log("POST TO: ", `${host}/api/${path}`);
  const resp: Response = await fetch(`${host}/api/${path}`, {
    method: "POST",
    body: JSON.stringify(body),
    next:{
      tags: tag ? [tag] : undefined
    }
  });

  if (!resp.ok) {
    throw new Error(`Error calling ${path}`);
  }

  return resp.json();
}

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
  const orders = await POST("/orders", filters, "orders");

  return orders.orders;
}

export interface ProductsFilter {
  query?: string;
  category?: string;
  from?: string;
  to?: string;
}

export async function getProducts(filters: ProductsFilter): Promise<DBProduct[]> {
  const products = await POST("/products", filters, "products");
  return products.products;
}

export async function getAuditRegistry(): Promise<DBInventoryLog[]> {
  const resp = await GET("/products/logs", "logs");

  return resp.logs;
}