import { guilds } from '@/lib/db/schema/guilds';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const channels = pgTable('channels', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  guildId: uuid('guild_id')
    .notNull()
    .references(() => guilds.id, { onDelete: 'cascade' }),
  name: text('name').notNull()
});

export type InsertChannel = typeof channels.$inferInsert;
export type Channel = typeof channels.$inferSelect;
