import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './supabase/migrations',
  // dialect: 'postgresql',
  schemaFilter: ['public'],
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
    // url: process.env.DATABASE_URL!
  }
});
