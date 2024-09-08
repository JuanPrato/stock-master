import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { unstable_cache } from "next/cache";
import { category } from "@/db/schema";

const url = process.env.DB_URL;

if (!url) {
  throw new Error();
}

export const client = createClient({ url, authToken: process.env.DB_AUTH_TOKEN });

export const db = drizzle(client);

export const getCategories = unstable_cache(
  async () => {
    return await db.select().from(category);
  },
  ["categories"],
  {
    revalidate: 3600,
    tags: ["categories"],
  }
);
