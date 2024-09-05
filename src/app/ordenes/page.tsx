import OrdersTable from "@/components/orders/orders-table";
import { getOrders } from "@/lib/api.utils";

export default async function OrdersPage() {

  const orders = await getOrders();

  return (
    <div>
      <h2>Ordenes</h2>
      <div>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}