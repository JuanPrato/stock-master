"use client";

import { PencilIcon } from "lucide-react";
import Modal from "../layout/modal";
import { Button } from "../shadcn/ui/button";
import { DBCategory, DBProduct } from "@/lib/db.type";
import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Textarea } from "../shadcn/ui/textarea";
import Input from "../layout/input";

interface Props {
  product: DBProduct;
  categories: DBCategory[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function EditModal({ product, categories, open, onOpenChange }: Props) {

  return (
    <Modal
      footer={(<Button>Guardar cambios</Button>)}
      title="Modificar producto existente"
      description="Puede cambiar los detalles del producto a continuación"
      shouldClose={{ state: open }}
      onOpenChange={onOpenChange}
    >
      <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
        <Input name="Nombre" id="name" type="text" defaultValue={product.name} />
        <Input name="Stock" id="stock" type="number" defaultValue={product.stock} />
        <Input name="Limite stock" id="stockLimit" type="number" defaultValue={product.stockLimit} />
        <Input name="Precio" id="price" type="number" defaultValue={product.price} />
        <InputBox>
          <Label htmlFor="category" className="text-md w-1/4">Categoría</Label>
          <Select name="category" defaultValue={product.category?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder="Elegí la categoría del producto" />
            </SelectTrigger>
            <SelectContent>
              {
                categories?.map(cat => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>{cat.description}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </InputBox>
        <InputBox>
          <Label htmlFor="description" className="text-md w-1/4">Descripción</Label>
          <Textarea id="description" name="description" defaultValue={product.description || ""} />
        </InputBox>
      </form>
    </Modal>
  );
}