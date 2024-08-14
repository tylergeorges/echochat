'use server';

import { cache } from 'react';

import { eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { type InsertGuildMember, guildMembers, guilds } from '@/lib/db/schema/guilds';
import { type InsertUser, users } from '@/lib/db/schema/users';

export const userById = cache(async (userId: string) =>
  db.select().from(users).where(eq(users.id, userId))
);

export const insertUser = async (user: InsertUser) => db.insert(users).values(user).returning();

export const insertGuildMember = async (guildMember: InsertGuildMember) =>
  db.insert(guildMembers).values(guildMember).returning();

export const getMemberById = async (memberId: string) =>
  db.query.guildMembers.findMany({
    where: eq(guildMembers.memberId, memberId),
    columns: {
      guildId: true,
      joinedAt: true,
      memberId: true
    },

    with: {
      guild: {
        columns: {
          name: true,
          id: true,
          icon: true,
          ownerId: true,
          defaultChannelId: true,
          inviteCode: true
        },

        extras: {
          isOwner: sql<boolean>`${guilds.ownerId}=${memberId}`.as('is_owner')
        }
      }
    }
  });
