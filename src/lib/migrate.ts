import "dotenv/config";
import { db, client } from './db';
import { migrate } from "drizzle-orm/libsql/migrator";

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle' }).catch(console.error);

// Don't forget to close the connection, otherwise the script will hang
client.close();