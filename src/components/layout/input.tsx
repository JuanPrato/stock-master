import { Label } from "../shadcn/ui/label";
import { Input as InputUI } from "../shadcn/ui/input";
import { ComponentProps } from "react";

type Props = {
  name: string;
  error?: string;
} & ComponentProps<typeof InputUI>;

export default function Input(props: Props) {


  return (
    <div className="flex gap-4 items-center">
      <Label htmlFor={props.id} className="text-md w-1/4">{props.name}</Label>
      <div className="w-full">
        <InputUI {...props} name={props.id} className={props.error && "ring ring-destructive"} />
        {
          props.error && (
            <p className="text-muted-foreground text-sm mt-1">{props.error}</p>
          )
        }
      </div>
    </div>
  );
}