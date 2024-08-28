"use client";

import { Package } from "lucide-react";
import Button from "../layout/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import Input from "../layout/input";
import { saveProduct } from "./actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Textarea } from "../shadcn/ui/textarea";

interface Props {
  categories: { id: number, description: string }[]
}

export default function AddProduct({ categories }: Props) {

  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState<any>();
  const [state, action] = useFormState(saveProduct, { errors: undefined, pending: true });

  useEffect(() => {
    if (!state.errors) {
      setOpen(false);
    } else {
      setErrors(state.errors);
    }
  }, [state]);

  useEffect(() => {
    if (!open) {
      setErrors(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Package} buttonProps={{ onClick: () => setOpen(true) }}>Añadir Producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo Producto</DialogTitle>
          <DialogDescription>Complete los detalles del nuevo producto a continuación</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3" action={action} id="prodForm">
          <Input name="Nombre" id="name" type="text" error={errors?.name} />
          <Input name="Stock" id="stock" type="number" error={errors?.stock} />
          <Input name="Limite stock" id="stockLimit" type="number" error={errors?.stockLimit} />
          <Input name="Precio" id="price" type="number" error={errors?.price} />
          <div className="flex gap-4 items-center">
            <Label htmlFor="category" className="text-md w-1/4">Categoría</Label>
            <Select>
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
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="description" className="text-md w-1/4">Descripción</Label>
            <Textarea id="description" />
          </div>
        </form>
        <DialogFooter>
          <Button buttonProps={{ type: "submit", form: "prodForm" }}>Añadir producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}