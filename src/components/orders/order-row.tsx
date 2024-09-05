"use client"

import { formatDate, formatMoney } from "@/lib/utils";
import { ChevronUp, AlertTriangle, CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";
import { TableRow, TableCell } from "../shadcn/ui/table";
import ProductsDetail from "./products-detail";
import { ClientOrders } from "@/app/api/orders/route";
import { Button } from "../shadcn/ui/button";
import { useState } from "react";
import { Badge } from "../shadcn/ui/badge";

interface Props {
  order: ClientOrders;
}

export default function OrderRow({ order }: Props) {

  const [showProducts, setShowProducts] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVO':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'CANCELADO':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'FINALIZADO':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

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
        <TableCell>
          <div className="flex items-center gap-2">
            {getStatusIcon(order.state)}
            <span className="capitalize">{order.state}</span>
          </div>
        </TableCell>
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