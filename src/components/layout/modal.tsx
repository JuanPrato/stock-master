"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";

interface Props {
  trigger: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  onOpenChange?: (value: boolean) => void;
  shouldClose?: { should: boolean };
}

export default function Modal({ children, trigger, title, description, footer, onOpenChange, shouldClose }: PropsWithChildren<Props>) {

  const [open, setOpen] = useState(false);

  function handleOpenChange(v: boolean) {
    setOpen(v);
    onOpenChange && onOpenChange(v);
  }

  useEffect(() => {
    if (shouldClose)
      handleOpenChange(false);
  }, [shouldClose]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && (
            <DialogTitle>{title}</DialogTitle>
          )}
          {
            description && (
              <DialogDescription>{description}</DialogDescription>
            )
          }
        </DialogHeader>
        {children}
        <DialogFooter>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}