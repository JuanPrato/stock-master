import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { unstable_cache } from "next/cache";
import { category } from "@/db/schema";

const client = createClient({ url: "file:./sqlite.db" });

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
