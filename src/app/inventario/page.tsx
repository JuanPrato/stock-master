import Filters from "@/components/inventory/filters";
import ProductsTable from "@/components/inventory/products-table";
import { Button } from "@/components/shadcn/ui/button";
import { category, products as productsTable } from "@/db/schema";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Inventory() {

  const categories = await db.select().from(category);
  const products = await db.select().from(productsTable);

  return (
    <main className="flex-1 py-6 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario Completo</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 max-w-4" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
      <Filters categories={categories} />
      <ProductsTable products={products} categories={categories} />
    </main>
  );
}