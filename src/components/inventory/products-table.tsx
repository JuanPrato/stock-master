import { formatMoney } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
import ActionsButton from "./actions-button";
import { DBCategory, DBProduct } from "@/lib/db.type";
import {Badge} from "@/components/shadcn/ui/badge";

interface Props {
  products: DBProduct[],
  categories: DBCategory[]
}

export default function ProductsTable({ products, categories }: Props) {

  function getCategory(id: number) {
    const cat = categories.find(c => c.id === id);

    if (!cat) return "";

    return (
        <Badge style={{ backgroundColor: cat.color || undefined }}>{cat.description}</Badge>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Id</TableHead>
          <TableHead className="w-[200px]">Nombre</TableHead>
          <TableHead className="w-[250px]">Descripción</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Costo u.</TableHead>
          <TableHead className="w-[50px]">Cantidad</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
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