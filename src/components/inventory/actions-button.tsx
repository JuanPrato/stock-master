"use client"

import { Ellipsis, PencilIcon, Trash } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../shadcn/ui/dropdown-menu";
import EditModal from "./edit-modal";
import { DBCategory, DBProduct } from "@/lib/db.type";
import { useState } from "react";
import DeleteModal from "./delete-modal";

interface Props {
  product: DBProduct;
  categories: DBCategory[]
}

export default function ActionsButton({ product, categories }: Props) {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><Ellipsis className="size-6" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenEdit(true)}>
            <Button variant="ghost" icon={PencilIcon} className="p-1 size-full" >Editar</Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenDelete(true)}>
            <Button variant="ghost" icon={Trash} className="p-1 size-full">Eliminar</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditModal
        product={product}
        categories={categories}
        open={openEdit}
        onOpenChange={(v) => setOpenEdit(v)}
      />
      <DeleteModal
        product={product}
        onOpenChange={(v) => setOpenDelete(v)}
        open={openDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </>
  );
}