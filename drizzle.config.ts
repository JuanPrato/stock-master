import { defineConfig } from "drizzle-kit";
import { env } from "process";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_URL!,
    authToken: env.DB_AUTH_TOKEN!,
  },
});
