import { CircleDollarSignIcon } from "lucide-react";
import Input from "./input";
import { Input as InputUI } from "@/components/shadcn/ui/input";
import { ComponentProps } from "react";
import { Label } from "../shadcn/ui/label";
import { twMerge } from "tailwind-merge";

export default function MoneyInput(props: ComponentProps<typeof Input>) {

  return (
    <div className="flex gap-4 items-center">
      <Label
        htmlFor={props.id}
        className={twMerge("text-md w-1/4", props.labelProps?.className)}
      >
        {props.name}
      </Label>
      <div className="w-full">
        <div className="relative">
          <CircleDollarSignIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary size-5" />
          <InputUI {...props} name={props.id} className={twMerge(props.error && "ring ring-destructive", props.className, "pl-8")} />
        </div>
        {
          props.error && (
            <p className="text-muted-foreground text-sm mt-1">{props.error}</p>
          )
        }
      </div>
    </div>
  );

}