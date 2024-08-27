import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./sqlite.db",
  },
});
