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

export default function AddProduct() {

  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState<any>();
  const [state, action] = useFormState(saveProduct, { errors: undefined, pending: true });

  useEffect(() => {
    console.log("ENTRE");
    if (!state.errors) {
      setOpen(false);
    } else {
      console.log(state.errors);
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
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button buttonProps={{ type: "submit", form: "prodForm" }}>Añadir producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}