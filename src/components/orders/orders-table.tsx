import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";

import { ClientOrders } from "@/app/api/orders/route";
import OrderRow from "./order-row";

interface Props {
  orders: ClientOrders[];
}

export default function OrdersTable({ orders }: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Urgente</TableHead>
          <TableHead>Cant. Art.</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}