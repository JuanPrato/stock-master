"use server";

import { zfd } from "zod-form-data";
import { parseErrors } from "@/lib/utils";
import { db } from "@/lib/db";
import { category } from "@/db/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

const schemaSaveCategory = zfd.formData({
  id: zfd.numeric().optional(),
  name: zfd.text(),
  color: zfd.text()
});

export async function saveCategory(_: any, formData: FormData): Promise<{ pending: boolean, errors?: any }> {

  const { data: value, error, success } = schemaSaveCategory.safeParse(formData);
  console.log(value);
  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    }
  }

  if (value.id) {
    await db
      .update(category)
      .set({
        color: value.color,
        description: value.name
      })
      .where(eq(category.id, value.id));
  } else {
    await db.insert(category).values({
      color: value.color,
      description: value.name
    });
  }

  revalidateTag("categories");

  return {
    pending: false
  };
}