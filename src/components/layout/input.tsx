import { Label } from "../shadcn/ui/label";
import { Input as InputUI } from "../shadcn/ui/input";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string;
  error?: string;
  labelProps?: { className: string };
  containerProps?: { className: string };
} & ComponentProps<typeof InputUI>;

export default function Input(props: Props) {


  return (
    <div className="flex gap-4 items-center">
      <Label
        htmlFor={props.id}
        className={twMerge("text-md w-1/4", props.labelProps?.className)}
      >
        {props.name}
      </Label>
      <div className="w-full">
        <InputUI {...props} name={props.id} className={twMerge(props.error && "ring ring-destructive", props.className)} />
        {
          props.error && (
            <p className="text-muted-foreground text-sm mt-1">{props.error}</p>
          )
        }
      </div>
    </div>
  );
}