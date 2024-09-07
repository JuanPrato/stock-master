import { db } from "@/lib/db";
import { inventoryLog } from "@/db/schema";

export async function GET() {
  const logs = await db.select().from(inventoryLog).limit(30);

  return Response.json({
    logs: logs,
  });
}