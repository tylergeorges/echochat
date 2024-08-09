import { User as SupabaseUser } from '@supabase/supabase-js';
import { pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const SupaBaseAuthSchema = pgSchema('auth');

const SupabaseAuthUsers = SupaBaseAuthSchema.table('users', {
  id: uuid('id').primaryKey()
});

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .references(() => SupabaseAuthUsers.id, { onDelete: 'cascade' }),
  username: text('username').notNull(),
  avatarUrl: text('avatar_url').notNull()
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type AuthUser = SupabaseUser;

export const guilds = pgTable('guilds', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  icon: text('icon')
});

export type InsertGuild = typeof guilds.$inferInsert;
export type Guild = typeof guilds.$inferSelect;
export type PartialGuild = {
  name: string;
  id: string;
  ownerId: string;
  isOwner: boolean;
};

export const guildMembers = pgTable('guild_members', {
  memberId: uuid('member_id')
    .notNull()
    .references(() => users.id),
  guildId: uuid('guild_id')
    .notNull()
    .references(() => guilds.id),
  joinedAt: timestamp('joined_at').notNull().defaultNow()
});

export type GuildMember = typeof guildMembers.$inferSelect;
export type InsertGuildMember = typeof guildMembers.$inferInsert;

export const channels = pgTable('channels', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  guildId: uuid('guild_id')
    .notNull()
    .references(() => guilds.id, { onDelete: 'cascade' }),
  name: text('name').notNull()
});

export type InsertChannel = typeof channels.$inferInsert;
export type Channel = typeof channels.$inferSelect;

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
