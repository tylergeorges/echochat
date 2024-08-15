import 'dotenv/config';
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres, { type Sql } from 'postgres';
import * as schema from './schema';

let connection: Sql<{}>;

if (process.env.NODE_ENV === 'production') {
  connection = postgres(process.env.POSTGRES_URL!);
} else {
  const globalConnection = global as typeof globalThis & {
    connection: Sql<{}>;
  };

  if (!globalConnection.connection)
    globalConnection.connection = postgres(process.env.POSTGRES_URL!, {
      prepare: false
    });

  connection = globalConnection.connection;
}

let db: PostgresJsDatabase<typeof schema>;

declare global {
  var db: PostgresJsDatabase<typeof schema>;
}

if (process.env.NODE_ENV === 'production') {
  db = drizzle(connection, { schema });
} else {
  if (!global.db) global.db = drizzle(connection, { schema });

  db = global.db;
}

export { db };
