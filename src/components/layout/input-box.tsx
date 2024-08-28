import { PropsWithChildren } from "react";

export default function InputBox({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-4 items-center">
      {children}
    </div>
  );
}