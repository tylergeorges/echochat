import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './supabase/migrations',
  // dialect: 'postgresql',
  schemaFilter: ['public'],
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
    database: process.env.POSTGRES_URL!
  }
});
