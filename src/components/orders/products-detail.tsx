"use client"

import { ClientOrders } from "@/app/api/orders/route";
import { TableCell, TableRow } from "../shadcn/ui/table";
import { formatMoney } from "@/lib/utils";

interface Props {
  products: ClientOrders["products"];
  open: boolean;
}

export default function ProductsDetail({ products, open }: Props) {

  return (

    <TableRow className="overflow-hidden" hidden={!open}>
      <TableCell></TableCell>
      <TableCell colSpan={6}>
        <div>
          <div className="p-4 bg-muted/50 rounded-md">
            <h4 className="font-semibold mb-2">Productos:</h4>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.product} className="flex justify-between">
                  <span>{product.product} (x{product.quantity})</span>
                  <span>{formatMoney(product.price * product.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}