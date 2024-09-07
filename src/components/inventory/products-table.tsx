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
          <TableHead>Id</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Costo u.</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{getCategory(product.category!)}</TableCell>
            <TableCell>{formatMoney(product.price)}</TableCell>
            <TableCell>{formatMoney(product.unitCost)}</TableCell>
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