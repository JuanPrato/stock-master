import Filters from "@/components/inventory/filters";
import ProductsTable from "@/components/inventory/products-table";
import { category as categoryTable, products as productsTable } from "@/db/schema";
import { db, getCategories } from "@/lib/db";
import { like, and, eq, inArray, SQL } from "drizzle-orm";

interface Props {
  searchParams: {
    query?: string;
    category?: string;
  }
}

export default async function Inventory({ searchParams }: Props) {

  const { query, category } = searchParams;

  const categories = await getCategories();

  const conditions: SQL<any>[] = [];

  if (query) {
    conditions.push(like(productsTable.name, `%${query}%`));
  }

  if (category && category !== "all") {
    const selectedCategory = categories.find(c => c.id.toString() === category);
    conditions.push(eq(productsTable.category, selectedCategory!.id));
  }

  const products = await db.select().from(productsTable).where(and(...conditions));

  return (
    <main className="flex-1 py-6 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Inventario Completo</h1>
        <Filters categories={categories} defaultValues={searchParams} />
      </div>
      <ProductsTable products={products} categories={categories} />
    </main>
  );
}