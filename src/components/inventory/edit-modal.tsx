"use client";

import Modal from "../layout/modal";
import { Button } from "../shadcn/ui/button";
import { DBCategory, DBProduct } from "@/lib/db.type";
import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Textarea } from "../shadcn/ui/textarea";
import Input from "../layout/input";
import { Input as InputUI } from "../shadcn/ui/input";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { saveProduct, updateProduct } from "../dashboard/actions";
import MoneyInput from "../layout/money-input";

interface Props {
  product: DBProduct;
  categories: DBCategory[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function EditModal({ product, categories, open, onOpenChange }: Props) {

  const [errors, setErrors] = useState<any>();
  const [state, action] = useFormState(updateProduct, { errors: undefined, pending: true });

  useEffect(() => {
    if (!state.errors) {
      onOpenChange(false);
    } else {
      setErrors(state.errors);
    }
  }, [state]);


  return (
    <Modal
      footer={(<Button type="submit" form="updateProduct">Guardar cambios</Button>)}
      title="Modificar producto existente"
      description="Puede cambiar los detalles del producto a continuación"
      shouldClose={{ state: open }}
      onOpenChange={onOpenChange}
    >
      <form className="flex flex-col gap-3" action={action} id="updateProduct">
        <InputUI type="hidden" name="id" defaultValue={product.id} />
        <Input name="Nombre" id="name" type="text" defaultValue={product.name} error={errors?.name} />
        <Input name="Stock" id="stock" type="number" defaultValue={product.stock} error={errors?.stock} />
        <Input name="Limite stock" id="stockLimit" type="number" defaultValue={product.stockLimit} error={errors?.stockLimit} />
        <InputBox>
          <MoneyInput name="Precio" id="price" type="number" defaultValue={product.price} error={errors?.price} />
          <MoneyInput name="Cost" id="unitCost" type="number" defaultValue={product.unitCost} error={errors?.unitCost} />
        </InputBox>
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