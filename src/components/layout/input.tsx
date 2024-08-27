import { Label } from "../shadcn/ui/label";
import { Input as InputUI } from "../shadcn/ui/input";
import { ComponentProps } from "react";

type Props = {
  name: string;
} & ComponentProps<typeof InputUI>;

export default function Input(props: Props) {
  return (
    <div className="flex gap-4 items-center">
      <Label htmlFor={props.id} className="text-md w-1/4">{props.name}</Label>
      <InputUI {...props} />
    </div>
  );
}