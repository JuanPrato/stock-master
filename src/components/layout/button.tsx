import { Package } from "lucide-react";
import { forwardRef, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

interface Props {
  icon?: typeof Package;
  accent?: boolean;
  buttonProps?: ComponentProps<"button">;
}

function ButtonA({ children, icon: Icon, accent, buttonProps }: PropsWithChildren<Props>, ref: any) {
  return (
    <button className={twMerge("flex items-center justify-center w-full p-3 rounded-md gap-2 text-sm font-regular", accent ? "bg-secondary border border-border text-primary" : "bg-black text-primary-foreground")}
      {...buttonProps}
      ref={ref}
    >
      {
        Icon && <Icon className="size-4" />
      }
      {children}
    </button>
  )
}

export default forwardRef(ButtonA);