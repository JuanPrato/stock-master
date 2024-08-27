import { db } from "@/lib/db";
import { products as productsTable } from "@/db/schema";

export async function GET() {
  const products = await db.select().from(productsTable);

  return Response.json({
    products: products,
  });
}
