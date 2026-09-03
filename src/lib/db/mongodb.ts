import { MongoClient, type Db } from "mongodb";
import { modulesConfig } from "@/config/modules";

let client: MongoClient | null = null;

export function isMongoConfigured() {
  if (modulesConfig.database !== "mongodb") return false;
  const uri = process.env.MONGODB_URI;
  return Boolean(uri && !uri.includes("your-mongodb"));
}

/** Optional extra database. Auth and billing stay on Supabase. */
export async function getMongoDb(): Promise<Db> {
  if (!isMongoConfigured()) {
    throw new Error(
      "MongoDB is off. Set modulesConfig.database to \"mongodb\" and MONGODB_URI. See DOCUMENTATION.md.",
    );
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }

  return client.db(process.env.MONGODB_DB_NAME ?? "launchkit");
}
