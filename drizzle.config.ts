import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema/*',
  out: './supabase/migrations',
  // dialect: 'postgresql',
  schemaFilter: ['public'],
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!
  }
});
