"use server";

import { db } from "@/lib/db";
import { inventoryLog, products } from "@/db/schema";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = zfd.formData({
  name: zfd.text(),
  description: zfd.text().optional(),
  price: zfd.numeric(z.number().positive()),
  stock: zfd.numeric(z.number().min(0)),
  stockLimit: zfd.numeric(z.number().min(0)),
});

export async function saveProduct(prevState: any, formData: FormData) {
  "use server";

  const { data: value, error, success } = schema.safeParse(formData);

  if (!success) {
    console.log("ERROR PARSING", error);
    return {
      errors: error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {} as any),
      pending: false,
    };
  }

  const result = await db.insert(products).values(value);

  await db.insert(inventoryLog).values({
    product: value.name,
    type: "entry",
    quantity: value.stock,
  });

  revalidatePath("/");

  return {
    pending: false,
  };
}
