import { DBProduct } from "@/lib/db.type";
import { ProductsFilter } from "@/lib/api.utils";
import { and, eq, gte, like, lte, SQL } from "drizzle-orm";
import { category as categoriesTable, products as productsTable } from "@/db/schema";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

async function getProductsWithOutCache(filters: ProductsFilter): Promise<DBProduct[]> {
  const {query, category, to, from} = filters;

  const conditions: SQL<any>[] = [];

  if (query) {
    conditions.push(like(productsTable.name, `%${query}%`));
  }

  if (category && category !== "all") {
    const selectedCategory = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, Number(category)))
      .limit(1);
    if (selectedCategory.length > 0) {
      conditions.push(eq(productsTable.category, selectedCategory[0].id));
    }
  }

  if (from) {
    conditions.push(gte(productsTable.price, Number(from)));
  }

  if (to) {
    conditions.push(lte(productsTable.price, Number(to)));
  }

  return db.select().from(productsTable).where(and(...conditions));
}

export const getProducts = unstable_cache(getProductsWithOutCache, ["products"], { tags: ["products"] })