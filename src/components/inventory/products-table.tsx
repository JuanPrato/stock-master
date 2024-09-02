import { formatMoney } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
import ActionsButton from "./actions-button";
import { DBCategory, DBProduct } from "@/lib/db.type";

interface Props {
  products: DBProduct[],
  categories: DBCategory[]
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
              <ActionsButton product={product} categories={categories} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}