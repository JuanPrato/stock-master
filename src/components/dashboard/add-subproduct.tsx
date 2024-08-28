"use client"

import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Input as InputUI } from "../shadcn/ui/input";
import { products as productsTable } from "@/db/schema";
import { FormEvent, useEffect, useState } from "react";
import Button from "../layout/button";

interface Props {
  products: typeof productsTable.$inferSelect[],
  onAccept: (p: { name: string, value: number, quantity: number }) => void
}

export default function AddSubProduct({ products, onAccept }: Props) {

  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    handleUpdateValue();
  }, [productId, quantity]);

  function handleUpdateValue() {
    const product = products.find(p => p.id.toString() === productId);

    if (!product) return;

    setPrice(product.price * quantity);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    const product = products.find(p => p.id.toString() === productId);

    if (!product) return;
    onAccept({ name: product.name, quantity, value: product.price });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} id="subForm">
      <InputBox>
        <Label className="text-md w-1/4">Producto</Label>
        <Select onValueChange={setProductId}>
          <SelectTrigger>
            <SelectValue placeholder="Elegí el producto que quieras agregar" />
          </SelectTrigger>
          <SelectContent>
            {
              products.map(prod => (
                <SelectItem key={prod.id} value={prod.id.toString()}>
                  {prod.name}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </InputBox>
      <div className="flex items-center w-full">
        <InputBox>
          <Label className="text-md w-1/2">Cantidad</Label>
          <InputUI
            type="number"
            className="w-3/4"
            min={0}
            defaultValue={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.currentTarget.valueAsNumber))}
          />
        </InputBox>
        <h4 className="w-1/2 pl-4 font-semibold">Subtotal: ${price}</h4>
      </div>
      <Button buttonProps={{ type: "button", onClick: (e) => handleSubmit(e) }} >Agregar</Button>
    </form>
  );
}