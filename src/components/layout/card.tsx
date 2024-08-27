import { Package } from "lucide-react";
import Box from "./box";

interface Props {
  title: string;
  detail?: string;
  icon: typeof Package;
  value?: number;
  isMoney?: boolean;
}

export default function Card({ title, detail, icon: Icon, value, isMoney }: Props) {

  const format = new Intl.NumberFormat("es-AR", {
    currency: "ARS",
    style: isMoney ? "currency" : undefined
  });

  return (
    <Box>
      <header className="flex justify-between pb-8">
        <span className="font-medium text-sm">{title}</span>
        <Icon className="text-muted-foreground w-4 h-4" />
      </header>
      <main>
        <span className="font-bold text-2xl">{format.format(value || 0)}</span>
        <span className="block text-muted-foreground text-xs">{detail}</span>
      </main>
    </Box>
  )
}