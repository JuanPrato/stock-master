import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
import ActionEntry from "./action-entry";

export default function RecentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Acción</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop HP Pavilion</TableCell>
          <ActionEntry type="entry" />
          <TableCell>50</TableCell>
          <TableCell>Hace 30 minutos</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Monitor Dell 27&quot</TableCell>
          <ActionEntry type="out" />
          <TableCell>25</TableCell>
          <TableCell>Hace 1 hora</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Teclado Mecánico Logitech</TableCell>
          <ActionEntry type="update" />
          <TableCell>10</TableCell>
          <TableCell>Hace 2 hora</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}