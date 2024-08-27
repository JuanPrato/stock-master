import { PlusCircle, MinusCircle, RefreshCw } from "lucide-react";
import { TableCell } from "../shadcn/ui/table";
import { twMerge } from "tailwind-merge";

const DATA = {
  "entry": {
    icon: PlusCircle,
    text: "Entrada",
    color: "text-green-500"
  },
  "out": {
    icon: MinusCircle,
    text: "Salida",
    color: "text-red-500"
  },
  "update": {
    icon: RefreshCw,
    text: "Actualización",
    color: "text-blue-500"
  }
} as const;

interface Props {
  type: keyof typeof DATA;
}

export default function ActionEntry({ type }: Props) {

  const values = DATA[type || "entry"];

  return (
    <TableCell className="flex gap-1 items-center">
      <values.icon className={twMerge("size-4", values.color)} />
      {values.text}
    </TableCell>
  )
}