import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function Box({ children, className }: PropsWithChildren<Props>) {

  return (
    <div className={twMerge("border border-border py-4 px-6 rounded-lg w-full h-full", className)}>
      {children}
    </div>
  )

}