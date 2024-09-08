import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";

import OrderRow from "./order-row";
import { DBOrderState } from "@/lib/db.type";
import { ClientOrders } from "@/lib/orders.util";

interface Props {
  orders: ClientOrders[];
  states: DBOrderState[];
}

export default function OrdersTable({ orders, states }: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead className="w-[300px]">Cliente</TableHead>
          <TableHead className="w-[150px]">Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Urgente</TableHead>
          <TableHead className="w-[50px]">Cant. Art.</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} states={states} />
        ))}
      </TableBody>
    </Table>
  );
}