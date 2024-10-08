import Filters from "@/components/orders/filters";
import OrdersTable from "@/components/orders/orders-table";
import { orderStates } from "@/db/schema";
import { OrdersFilter } from "@/lib/api.utils";
import { db } from "@/lib/db";
import { getOrders } from "@/lib/orders.util";
import AddOrder from "@/components/dashboard/add-order";
import { getProducts } from "@/lib/products.util";

interface Props {
  searchParams: OrdersFilter;
}

export default async function OrdersPage({ searchParams }: Props) {

  const orders = await getOrders(searchParams);
  const products = await getProducts();

  const states = await db.select().from(orderStates);

  return (
    <main className="flex-1 py-6 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Ordenes</h2>
        <AddOrder products={products} />
      </div>
      <div className="flex gap-2">
        <div className="w-1/4">
          <Filters states={states} defaultFilters={searchParams} />
        </div>
        <OrdersTable orders={orders} states={states} />
      </div>
    </main>
  );
}