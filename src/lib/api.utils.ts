import { DBInventoryLog } from "@/lib/db.type";

const host = process.env.NEXT_PUBLIC_URL;

async function CALL(method: string, path: string, tag?: string, cfg?:any) {
  console.log(method, "TO: ", `${host}/api/${path}`);
  const resp = await fetch(`${host}/api/${path}`, {
    ...cfg,
    method,
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

async function GET(path: string, tag?: string, cfg?: any) {
  return CALL("GET", path, tag, cfg);
}

async function POST(path: string, body: any, tag?: string) {
  return CALL("POST", path, tag, { body: JSON.stringify(body) });
}

async function PUT(path: string, body: any, tag?: string) {
  return CALL("PUT", path, tag, { body: JSON.stringify(body) });
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
  const resp = await GET("/products/logs", "logs", { cache: "no-cache" });

  return resp.logs;
}

export async function logIn() {
  await POST("/login", {});
}

export async function clientLogOut() {
  await PUT("/logout", {});
}