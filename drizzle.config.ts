import { defineConfig } from "drizzle-kit";
import { env } from "process";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: env.NODE_ENV === "production" ? "turso" : undefined,
  dbCredentials: {
    url: env.DB_URL!,
    authToken: env.DB_AUTH_TOKEN!
  },
});