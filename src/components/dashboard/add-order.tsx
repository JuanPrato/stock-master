"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import InputUI from "../layout/input";
import { Input } from "../shadcn/ui/input";
import { saveOrder } from "./actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { products as productsTable } from "@/db/schema";
import AddSubProduct from "./add-subproduct";
import { Separator } from "../shadcn/ui/separator";
import Modal from "../layout/modal";
import { Checkbox } from "../shadcn/ui/checkbox";
import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";

export type BasicProduct = {
  id: number;
  productId: number;
  name: string;
  value: number;
  quantity: number;
}

interface Props {
  products: typeof productsTable.$inferSelect[]
}

const selectProductInitState = (id = 0) => ({
  id,
  productId: -1,
  name: "",
  quantity: 0,
  value: 0
});

export default function AddOrder({ products }: Props) {

  const [closeModal, setCloseModal] = useState({ should: false });
  const [errors, setErrors] = useState<any>();
  const [state, action] = useFormState(saveOrder, { errors: undefined, pending: true });

  const [selectProducts, setSelectedProducts] = useState<BasicProduct[]>([selectProductInitState()]);

  useEffect(() => {
    if (state.errors) {
      setErrors(state.errors);
      console.log(state.errors);
      return;
    }
    setCloseModal({ should: true });
  }, [state]);

  function addNewSubProduct() {
    setSelectedProducts(
      prev => [...prev, selectProductInitState(prev[prev.length - 1].id + 1)])
  }

  function handleSubProductClose(id: number) {
    setSelectedProducts(prev => {
      return prev.map(p => (p.id === id) ? undefined : p).filter(Boolean) as unknown as BasicProduct[];
    })
  }

  function updateSubProduct(product: BasicProduct) {
    setSelectedProducts(prev => {
      const index = prev.findIndex((v) => v.id === product.id);
      return prev.with(index, product);
    })
  }

  function onOpenChange(open: boolean) {
    if (!open) {
      setErrors(undefined);
      setSelectedProducts([selectProductInitState()]);
    }
  }



  return (
    <Modal
      trigger={(
        <Button icon={ShoppingCart}>Procesar Orden</Button>
      )}
      footer={(<Button type="submit" form="orderForm">Procesar orden</Button>)}
      title="Cargar una nueva orden"
      description="Los movimientos no se veras reflejado hasta que la orden no se marque como completada"
      onOpenChange={onOpenChange}
      shouldClose={closeModal}
    >
      <form className="flex flex-col gap-3" action={action} id="orderForm">
        <InputUI name="Cliente" id="client" type="text" error={errors?.client} />
        <div className="flex gap-3 flex-col items-start">
          <Separator />
          <div className="my-1">
            <h2 className="text-md inline-block font-bold">Productos</h2>
            {
              errors?.products && (
                <h3 className="text-red-400 text-sm m-0">{errors.products}</h3>
              )
            }
          </div>
          {
            selectProducts.map(prod => (
              <AddSubProduct
                key={prod.id}
                id={prod.id}
                products={products}
                canClose={prod.id !== 0}
                onUpdate={updateSubProduct}
                onClose={handleSubProductClose}
              />
            ))
          }
          <Input name="products" type="hidden" value={JSON.stringify(selectProducts)} onChange={() => { }} />
          <Button
            variant="secondary"
            type="button"
            onClick={addNewSubProduct}
          >Agregar producto
          </Button>
        </div>
        <Separator />
        <InputBox>
          <Label>Este pedido requiere urgencia?</Label>
          <Checkbox name="urgent" id="urgent" />
        </InputBox>
        <InputBox>
          <Label>Marcar como finalizada</Label>
          <Checkbox name="end" id="end" />
        </InputBox>
        <h3 className="text-md font-medium">Total: ${selectProducts.reduce((acc, prod) => acc + (prod.value * (prod.quantity || 0)), 0)}</h3>
      </form>
    </Modal>
  );
}