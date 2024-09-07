import Filters from "@/components/inventory/filters";
import ProductsTable from "@/components/inventory/products-table";
import {category as categoryTable, products as productsTable} from "@/db/schema";
import {db, getCategories} from "@/lib/db";
import {like, and, eq, inArray, SQL, gte, lte} from "drizzle-orm";
import AddProduct from "@/components/dashboard/add-product";
import {getProducts, ProductsFilter} from "@/lib/api.utils";
import AddCategory from "@/components/inventory/add-category";

interface Props {
  searchParams: ProductsFilter;
}

export default async function Inventory({searchParams}: Props) {

  const categories = await getCategories();
  const products = await getProducts(searchParams);

  return (
    <main className="flex-1 py-6 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Inventario Completo</h1>
        <div className="flex gap-2">
          <AddCategory />
          <AddProduct categories={categories}/>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4">
          <Filters categories={categories} defaultValues={searchParams}/>
        </div>
        <ProductsTable products={products} categories={categories}/>
      </div>
    </main>
  );
}