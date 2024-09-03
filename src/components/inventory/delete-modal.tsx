"use client"

import { DBProduct } from "@/lib/db.type";
import Modal from "../layout/modal";
import { Button } from "../shadcn/ui/button";
import { Check, X } from "lucide-react";
import { deleteProduct } from "../dashboard/actions";

interface Props {
  product: DBProduct;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function DeleteModal({ product, open, onOpenChange, onCancel }: Props) {

  async function handleAcceptDelete() {
    const data = new FormData();
    data.set("id", product.id.toString());

    const result = await deleteProduct(data);

    if (result?.errors) {
      console.error(result.errors.global);
      return;
    }

    onCancel();
  }

  return (
    <Modal
      shouldClose={{ state: open }}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex gap-3">
          <Button icon={Check} onClick={() => handleAcceptDelete()} variant="destructive">Aceptar</Button>
          <Button icon={X} onClick={() => onCancel()}>Cancelar</Button>
        </div>
      }
      title={`Seguro que desea eliminar ${product.name}?`}
      description="Esta acción no puede deshacerse"
    >
    </Modal>
  )
}