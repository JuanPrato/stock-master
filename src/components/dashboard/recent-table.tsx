import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table";
import ActionEntry from "./action-entry";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { DashboardGetResponse } from "@/lib/stats.util";


dayjs.extend(relativeTime);
dayjs.locale("es");

interface Props {
  logs: DashboardGetResponse["inventory"]
}

export default function RecentTable({ logs }: Props) {

  return (
    <Table className="overflow-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Producto</TableHead>
          <TableHead>Acción</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Fecha</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          logs.map(log => {

            const timeAgo = dayjs().to(dayjs(log.date));

            return (
              <TableRow key={`${log.product}-${log.date}`}>
                <TableCell>{log.product}</TableCell>
                <ActionEntry type={log.type!} />
                <TableCell>{log.quantity}</TableCell>
                <TableCell>{timeAgo}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}