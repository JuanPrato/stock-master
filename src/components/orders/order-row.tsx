"use client"

import { formatDate, formatMoney } from "@/lib/utils";
import { ChevronUp, AlertTriangle, CheckCircle, Clock, XCircle, ChevronDown, Ellipsis, Pen } from "lucide-react";
import { TableRow, TableCell } from "../shadcn/ui/table";
import ProductsDetail from "./products-detail";
import { Button } from "../shadcn/ui/button";
import { useState } from "react";
import { Badge } from "../shadcn/ui/badge";
import StateCell from "./state-cell";
import { DBOrderState } from "@/lib/db.type";
import { ClientOrders } from "@/lib/orders.util";

interface Props {
  order: ClientOrders;
  states: DBOrderState[];
}

export default function OrderRow({ order, states }: Props) {

  const [showProducts, setShowProducts] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProducts((p) => !p)}
          >
            {showProducts ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell className="font-medium">{order.client}</TableCell>
        <TableCell>{formatDate(order.date)}</TableCell>
        <StateCell orderId={order.id.toString()} state={order.state} states={states} />
        <TableCell>
          {order.urgent && (
            <Badge variant="destructive">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Urgente
            </Badge>
          )}
        </TableCell>
        <TableCell>{order.products.reduce((acc, p) => acc + p.quantity, 0)}</TableCell>
        <TableCell className="text-right">
          {formatMoney(order.total)}
        </TableCell>
      </TableRow>
      <ProductsDetail products={order.products} open={showProducts} />
    </>
  );
}