/* eslint-disable no-var */
import 'dotenv/config';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import * as schema from './schema';

let connection: Sql<{}>;

if (process.env.NODE_ENV === 'production') {
  connection = postgres(process.env.DATABASE_URL!);
} else {
  const globalConnection = global as typeof globalThis & {
    connection: Sql<{}>;
  };

  if (!globalConnection.connection)
    globalConnection.connection = postgres(process.env.DATABASE_URL!, { prepare: false });

  connection = globalConnection.connection;
}

// eslint-disable-next-line import/no-mutable-exports
let db: PostgresJsDatabase<typeof schema>;

declare global {
  // eslint-disable-next-line vars-on-top
  var db: PostgresJsDatabase<typeof schema>;
}

if (process.env.NODE_ENV === 'production') {
  db = drizzle(connection, { schema });
} else {
  if (!global.db) global.db = drizzle(connection, { schema });

  db = global.db;
}

export { db };

// const connectionString = process.env.POSTGRES_URL!;

// const client = postgres(connectionString, { prepare: false });

// export const db = drizzle(connection, { schema, logger: process.env.NODE_ENV !== 'production' });
