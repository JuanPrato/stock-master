import { category, products as productsTable } from "@/db/schema";
import { formatMoney } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
import { Button } from "../shadcn/ui/button";
import ActionsButton from "./actions-button";

interface Props {
  products: (typeof productsTable.$inferSelect)[],
  categories: (typeof category.$inferSelect)[]
}

export default function ProductsTable({ products, categories }: Props) {

  function getCategory(id: number) {
    return categories.find(c => c.id === id)?.description;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer">
            Id
          </TableHead>
          <TableHead className="cursor-pointer">
            Nombre
          </TableHead>
          <TableHead className="cursor-pointer">
            Categoría
          </TableHead>
          <TableHead className="cursor-pointer">
            Precio
          </TableHead>
          <TableHead className="cursor-pointer">
            Cantidad
          </TableHead>
          <TableHead className="cursor-pointer">
            Valor Total
          </TableHead>
          <TableHead className="cursor-pointer">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{getCategory(product.category!)}</TableCell>
            <TableCell>{formatMoney(product.price)}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{formatMoney(product.price * product.stock)}</TableCell>
            <TableCell>
              <ActionsButton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}