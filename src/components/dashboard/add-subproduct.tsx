"use client"

import InputBox from "../layout/input-box";
import { Label } from "../shadcn/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import { Input as InputUI } from "../shadcn/ui/input";
import { products as productsTable } from "@/db/schema";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import { CircleX } from "lucide-react";
import { BasicProduct } from "./add-order";

interface Props {
  products: typeof productsTable.$inferSelect[],
  id: number;
  canClose?: boolean;
  onUpdate: (product: BasicProduct) => void;
  onClose?: (id: number) => void;
}

export default function AddSubProduct({ products, id, canClose, onUpdate, onClose }: Props) {

  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    handleUpdateValue();
  }, [productId, quantity]);

  function handleUpdateValue() {
    const product = products.find(p => p.id.toString() === productId);

    if (!product) return;

    setPrice(product.price * (quantity || 0));

    onUpdate({
      id,
      productId: product.id,
      name: product.name,
      quantity: quantity,
      value: product.price
    })
  }

  return (
    <div className="w-full">
      <InputBox>
        <InputBox className="w-3/4 mb-1">
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
        <InputBox className="w-1/4">
          <InputUI
            type="number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.currentTarget.valueAsNumber))}
          />
          {
            canClose && (
              <Button variant="ghost" type="button" className="size-10 p-1" ><CircleX className="w-full h-full" onClick={() => onClose && onClose(id)} /></Button>
            )
          }
        </InputBox>
      </InputBox>
      <p className="pl-4 font-normal text-sm text-muted-foreground ">Subtotal: ${price}</p>
    </div>
  );
}