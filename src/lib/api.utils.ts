import { DBInventoryLog } from "@/lib/db.type";

const host = process.env.NEXT_PUBLIC_URL;

async function GET(path: string, tag?: string) {
  console.log("GET TO: ", `${host}/api/${path}`);
  const resp = await fetch(`${host}/api/${path}`, {
    next:{
      tags: tag ? [tag] : undefined
    }
  });

  if (!resp.ok) {
    console.log(`Error calling ${path}`);
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

export interface ProductsFilter {
  query?: string;
  category?: string;
  from?: string;
  to?: string;
}

export async function getAuditRegistry(): Promise<DBInventoryLog[]> {
  const resp = await GET("/products/logs", "logs");

  return resp.logs;
}

export async function logIn() {
  await POST("/login", {});

}