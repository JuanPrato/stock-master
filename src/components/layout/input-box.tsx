import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function InputBox({ children, className }: PropsWithChildren<Props>) {
  return (
    <div className={twMerge("flex gap-4 items-center", className)}>
      {children}
    </div>
  );
}