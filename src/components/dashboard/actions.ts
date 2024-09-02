"use server";

import { db } from "@/lib/db";
import { inventoryLog, orders, products } from "@/db/schema";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { parseErrors } from "@/lib/utils";
import { eq, inArray } from "drizzle-orm";

const schemaSaveProduct = zfd.formData({
  name: zfd.text(),
  description: zfd.text().optional(),
  price: zfd.numeric(z.number().positive()),
  stock: zfd.numeric(z.number().min(0)),
  stockLimit: zfd.numeric(z.number().min(0)),
  category: zfd.numeric(z.number().min(0)),
});

export async function saveProduct(prevState: any, formData: FormData) {
  const { data: value, error, success } = schemaSaveProduct.safeParse(formData);

  if (!success) {
    console.log("ERROR PARSING", error);
    return {
      errors: parseErrors(error),
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

const schemaProducts = z
  .array(
    z.object({
      id: z.number(),
      productId: z
        .number()
        .positive({ message: "Se deben completar todos los subproductos" }),
      name: z.string(),
      value: z.number(),
      quantity: z.number(),
    })
  )
  .min(1);

const schemaSaveOrder = zfd.formData({
  client: zfd.text(),
  urgent: zfd.checkbox(),
  products: zfd.json(schemaProducts),
});

export async function saveOrder(
  ps: any,
  formData: FormData
): Promise<{ pending: boolean; errors: any }> {
  const { data: value, error, success } = schemaSaveOrder.safeParse(formData);

  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    };
  }

  const productsDB = await db
    .select()
    .from(products)
    .where(
      inArray(
        products.id,
        value.products.map((p) => p.productId)
      )
    );

  if (productsDB.length !== value.products.length) {
    return {
      pending: false,
      errors: {
        products: "Algún producto seleccionado es invalido",
      },
    };
  }

  await db.insert(orders).values({
    client: value.client,
    urgent: value.urgent,
    products: value.products.map((p) => ({
      price: p.value,
      product: p.name,
      quantity: p.quantity,
    })),
    total: value.products.reduce((acc, p) => acc + p.value * p.quantity, 0),
  });

  await db.insert(inventoryLog).values(
    value.products.map((p) => ({
      product: p.name,
      type: "out" as const,
      quantity: p.quantity,
    }))
  );

  for (const prod of value.products) {
    const productDB = productsDB.find((p) => p.id === prod.productId);

    if (!productDB) continue;

    await db
      .update(products)
      .set({
        stock: productDB.stock - prod.quantity,
      })
      .where(eq(products.id, productDB.id));
  }

  revalidatePath("/");

  return {
    pending: false,
    errors: undefined,
  };
}
