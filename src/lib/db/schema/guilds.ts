import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/lib/db/schema/users';

export const roleEnum = pgEnum('role', ['Owner', 'Admin']);

export const guilds = pgTable('guilds', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  inviteCode: uuid('invite_code').notNull().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  icon: text('icon'),
  defaultChannelId: uuid('default_channel_id')
});

export const guildMembers = pgTable(
  'guild_members',
  {
    memberId: uuid('member_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    guildId: uuid('guild_id')
      .notNull()
      .references(() => guilds.id, { onDelete: 'cascade' }),
    joinedAt: timestamp('joined_at', { mode: 'date' }).notNull().defaultNow()
  },
  t => ({
    pk: primaryKey({ columns: [t.guildId, t.memberId] })
  })
);

export const guildRelations = relations(guilds, ({ many }) => ({
  members: many(guildMembers)
}));

export const guildMembersRelations = relations(guildMembers, ({ one }) => ({
  guild: one(guilds, {
    fields: [guildMembers.guildId],
    references: [guilds.id]
  }),
  member: one(users, {
    fields: [guildMembers.memberId],
    references: [users.id]
  })
}));

export const userRelations = relations(users, ({ many }) => ({
  guildMembers: many(guildMembers)
}));

export type GuildMember = typeof guildMembers.$inferSelect;
export type InsertGuildMember = typeof guildMembers.$inferInsert;

export type InsertGuild = typeof guilds.$inferInsert;
export type PartialGuild = {
  name: string;
  id: string;
  ownerId: string;
  isOwner: boolean;
};
