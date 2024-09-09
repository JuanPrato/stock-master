import { db } from "@/lib/db";
import { inventoryLog } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const logs = await db.select().from(inventoryLog).orderBy(desc(inventoryLog.id)).limit(30);

  return Response.json({
    logs: logs,
  });
}