"use client";

import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";

interface Props {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  onOpenChange?: (value: boolean) => void;
  shouldClose?: { should?: boolean, state?: boolean };
}

export default function Modal({ children, trigger, title, description, footer, onOpenChange, shouldClose }: PropsWithChildren<Props>) {

  const [open, setOpen] = useState(shouldClose?.state || false);

  function handleOpenChange(v: boolean) {
    setOpen(v);
    onOpenChange && onOpenChange(v);
  }

  useEffect(() => {
    if (shouldClose && shouldClose.should) {
      handleOpenChange(false);
    } else if (shouldClose && shouldClose.state !== undefined) {
      handleOpenChange(shouldClose.state);
    }
  }, [shouldClose]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {
        trigger && (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        )
      }
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