import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '@/lib/db/schema/users';
import { channels } from '@/lib/db/schema/channels';

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  channelId: uuid('channel_id')
    .notNull()
    .references(() => channels.id, { onDelete: 'cascade' })
});

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;
