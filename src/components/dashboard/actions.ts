"use server";

import { db } from "@/lib/db";
import { inventoryLog, orders, products } from "@/db/schema";
import { zfd } from "zod-form-data";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { parseErrors } from "@/lib/utils";
import { eq, inArray } from "drizzle-orm";
import { STATES } from "@/lib/constants";

const schemaSaveProduct = zfd.formData({
  name: zfd.text(),
  description: zfd.text().optional(),
  price: zfd.numeric(z.number().positive()),
  unitCost: zfd.numeric(z.number().positive()),
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

  try {
    const result = await db.insert(products).values(value);

    if (result.rowsAffected === 0) {
      return {
        pending: false,
        errors: "Error saving product",
      }
    }
  } catch (error) {
    console.log(error);
  }

  await db.insert(inventoryLog).values({
    product: value.name,
    type: "entry",
    quantity: value.stock,
  });

  revalidatePath("/");
  revalidateTag("logs");
  revalidateTag("products");

  return {
    pending: false,
  };
}

const schemaUpdateProduct = zfd.formData({
  id: zfd.numeric(),
  name: zfd.text(),
  description: zfd.text(z.string().optional()),
  price: zfd.numeric(z.number().positive()),
  unitCost: zfd.numeric(z.number().positive()),
  stock: zfd.numeric(z.number().min(0)),
  stockLimit: zfd.numeric(z.number().min(0)),
  category: zfd.numeric(z.number().min(0)),
});

export async function updateProduct(ps: any, formData: FormData) {
  const {
    data: value,
    error,
    success,
  } = schemaUpdateProduct.safeParse(formData);

  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    };
  }

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, value.id))
    .limit(1);

  if (product.length === 0) {
    console.log("producto no encontrado");
    return {
      pending: false,
      errors: {
        global: "Producto no encontrado",
      },
    };
  }

  const v: Partial<typeof value> = { ...value };

  delete v.id;

  await db.update(products).set(v).where(eq(products.id, value.id));

  await db.insert(inventoryLog).values({
    product: value.name,
    quantity: value.stock - product[0].stock,
    type: "update",
  });

  revalidatePath("/inventario");
  revalidateTag("logs");
  revalidateTag("products");

  return {
    pending: false,
  };
}

const schemaDeleteProduct = zfd.formData({
  id: zfd.numeric(),
});

export async function deleteProduct(formData: FormData) {
  const { data, success, error } = schemaDeleteProduct.safeParse(formData);

  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    };
  }

  const product = await db
    .delete(products)
    .where(eq(products.id, data.id))
    .returning();

  if (!product[0]) {
    return {
      pending: false,
      errors: {
        global: "Producto no encontrado",
      },
    };
  }

  await db.insert(inventoryLog).values({
    product: product[0].name,
    quantity: product[0].stock,
    type: "out",
  });

  revalidatePath("/inventario");
  revalidateTag("logs");

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
  end: zfd.checkbox(),
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
    state: value.end ? STATES.FINALIZED : STATES.ACTIVE,
  });

  if (value.end) {
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

    await db.insert(inventoryLog).values(
      value.products.map((p) => ({
        product: p.name,
        type: "out" as const,
        quantity: p.quantity,
      }))
    );
  }

  revalidatePath("/");
  revalidateTag("orders");

  return {
    pending: false,
    errors: undefined,
  };
}

const schemaUpdateOrderState = zfd.formData({
  orderId: zfd.numeric(),
  stateId: zfd.numeric(),
});

export async function updateOrderState(formData: FormData) {
  const {
    data: value,
    error,
    success,
  } = schemaUpdateOrderState.safeParse(formData);

  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    };
  }

  const dbOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.id, value.orderId))
    .limit(1);

  if (dbOrders.length === 0) {
    return {
      pending: false,
    };
  }

  const order = dbOrders[0];

  await db
    .update(orders)
    .set({ state: value.stateId })
    .where(eq(orders.id, value.orderId));

  for (const prod of order.products) {
    // TODO: save products id to update stock
    const productsDB = await db
      .select()
      .from(products)
      .where(eq(products.name, prod.product));

    if (productsDB.length === 0) continue;

    const productDB = productsDB[0];

    if (productDB.stock - prod.quantity === 0) continue;

    await db
      .update(products)
      .set({
        stock: productDB.stock - prod.quantity,
      })
      .where(eq(products.id, productDB.id));

    await db.insert(inventoryLog).values({
      product: prod.product,
      type: "out" as const,
      quantity: prod.quantity,
    });
  }

  revalidatePath("/ordenes");
  revalidateTag("orders");

  return {
    pending: false,
  };
}
