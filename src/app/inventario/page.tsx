import Button from "@/components/layout/button";
import { Input } from "@/components/shadcn/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/shadcn/ui/table";
import { category, products as productsTable } from "@/db/schema";
import { db } from "@/lib/db";
import { ArrowLeft, Search, Table } from "lucide-react";
import Link from "next/link";

export default async function Inventory() {

  const categories = await db.select().from(category);
  const products = await db.select().from(productsTable);

  function getCategory(id: number) {
    return categories.find(c => c.id === id)?.description;
  }

  return (
    <main className="flex-1 py-6 px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario Completo</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 max-w-4" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>{cat.description}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="cursor-pointer" onClick={() => requestSort('id')}>
              ID {sortConfig?.key === 'id' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
              Nombre {sortConfig?.key === 'name' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
              Categoría {sortConfig?.key === 'category' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('price')}>
              Precio {sortConfig?.key === 'price' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('quantity')}>
              Cantidad {sortConfig?.key === 'quantity' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort('totalValue')}>
              Valor Total {sortConfig?.key === 'totalValue' && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{getCategory(product.category!)}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>${(product.price * product.stock).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}