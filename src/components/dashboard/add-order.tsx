"use client";

import { ShoppingCart } from "lucide-react";
import Button from "../layout/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/ui/dialog";
import Input from "../layout/input";
import { saveProduct } from "./actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { products as productsTable } from "@/db/schema";
import AddSubProduct from "./add-subproduct";

type BasicProduct = {
  name: string;
  value: number;
  quantity: number;
}

interface Props {
  products: typeof productsTable.$inferSelect[]
}

export default function AddOrder({ products }: Props) {

  const [open, setOpen] = useState(true);
  const [addingProduct, setAddingProduct] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [state, action] = useFormState(saveProduct, { errors: undefined, pending: true });

  const [selectProducts, setSelectedProducts] = useState<BasicProduct[]>([]);

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

  function handleAddingProduct() {
    setAddingProduct(!addingProduct);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={ShoppingCart} buttonProps={{ onClick: () => setOpen(true) }}>Procesar Orden</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo Producto</DialogTitle>
          <DialogDescription>Complete los detalles del nuevo producto a continuación</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3" action={action} id="orderForm">
          <Input name="Cliente" id="client" type="text" error={errors?.name} />
          <div className="flex gap-3 flex-col">
            <h2 className="text-md my-3 inline-block font-bold">Productos</h2>
            {
              selectProducts.map(prod => (
                <div className="flex gap-2">
                  <h4>{prod.quantity} - </h4>
                  <h3 className="text-md fond-semibold">{prod.name}</h3>
                </div>
              ))
            }
            {
              addingProduct && (
                <AddSubProduct
                  products={products}
                  onAccept={(p) => {
                    setSelectedProducts((prev) => ([...prev, p]));
                    setAddingProduct(false);
                  }}
                />
              )
            }
            <Button
              accent
              buttonProps={{
                type: "button",
                onClick: handleAddingProduct,
              }}
            >{addingProduct ? "Cancelar" : "Agregar producto"}
            </Button>
          </div>
          <h3>Total: ${selectProducts.reduce((acc, prod) => acc + (prod.value * prod.quantity), 0)}</h3>
        </form>
        <DialogFooter>
          <Button buttonProps={{ type: "submit", form: "orderForm" }}>Procesar orden</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
}