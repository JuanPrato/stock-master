import { Package } from "lucide-react";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  icon?: typeof Package;
  accent?: boolean;
}

export default function Button({ children, icon: Icon, accent }: PropsWithChildren<Props>) {
  return (
    <button className={twMerge("flex items-center justify-center w-full p-3 rounded-md gap-2 text-sm font-regular", accent ? "bg-secondary border border-border text-primary" : "bg-black text-primary-foreground")}>
      {
        Icon && <Icon className="size-4" />
      }
      {children}
    </button>
  )
}