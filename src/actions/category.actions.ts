"use server";

import { zfd } from "zod-form-data";
import { parseErrors } from "@/lib/utils";
import { db } from "@/lib/db";
import { category } from "@/db/schema";

const schemaSaveCategory = zfd.formData({
  name: zfd.text(),
  color: zfd.text()
});

export async function saveCategory(_: any, formData: FormData): Promise<{ pending: boolean, errors?: any }> {

  const { data: value, error, success } = schemaSaveCategory.safeParse(formData);

  if (!success) {
    return {
      errors: parseErrors(error),
      pending: false,
    }
  }

  await db.insert(category).values({
    color: value.color,
    description: value.name
  });

  return {
    pending: false
  };
}