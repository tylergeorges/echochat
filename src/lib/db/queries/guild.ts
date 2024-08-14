'use server';

import { randomUUID } from 'node:crypto';
import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { insertChannel } from '@/lib/db/queries/channel';
import { insertGuildMember } from '@/lib/db/queries/user';
import { type InsertGuild, guildMembers, guilds } from '@/lib/db/schema/guilds';

export const guildsForMember = async (memberId: string) =>
  db.query.guildMembers.findMany({
    where: eq(guildMembers.memberId, memberId),
    columns: {},

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

export type Guild = QueryReturnType<typeof guildsForMember>['guild'];

export const getGuildInfo = async (guildId: string, memberId: string) =>
  db.query.guildMembers.findFirst({
    where: and(eq(guildMembers.memberId, memberId), eq(guildMembers.guildId, guildId)),

    columns: {},

    with: {
      guild: {
        columns: {
          name: true,
          id: true,
          icon: true,
          inviteCode: true,
          ownerId: true,
          defaultChannelId: true
        },

        extras: {
          isOwner: sql<boolean>`${guilds.ownerId}=${memberId}`.as('is_owner')
        }
      }
    }
  });

export const insertGuild = async ({ name, ownerId, icon }: InsertGuild) => {
  const defaultChannelId = randomUUID();

  const [res] = await db
    .insert(guilds)
    .values({ name, ownerId, icon, defaultChannelId })
    .returning();

  await insertChannel({
    name: 'general',
    guildId: res.id,
    id: defaultChannelId
  });

  const [guild] = await insertGuildMember({ guildId: res.id, memberId: ownerId });

  return getGuildInfo(guild.guildId, ownerId);
};

export const getGuildFromInvite = async (inviteCode: string, memberId: string) => {
  const guild = await db.query.guilds.findFirst({
    where: eq(guilds.inviteCode, inviteCode)
  });

  if (!guild) return undefined;

  return db.query.guildMembers.findFirst({
    where: and(eq(guildMembers.memberId, memberId), eq(guildMembers.guildId, guild.id)),

    columns: {},

    with: {
      guild: {
        columns: {
          name: true,
          id: true,
          icon: true,
          inviteCode: true,
          ownerId: true,
          defaultChannelId: true
        },

        extras: {
          isOwner: sql<boolean>`${guild.ownerId}=${memberId}`.as('is_owner')
        }
      }
    }
  });
};

export const addMemberToGuild = async (inviteCode: string, memberId: string) => {
  const guild = await db.query.guilds.findFirst({
    where: eq(guilds.inviteCode, inviteCode)
  });

  if (!guild) return undefined;

  const [guildMember] = await db
    .insert(guildMembers)
    .values({ guildId: guild.id, memberId })
    .returning();

  return getGuildInfo(guildMember.guildId, guildMember.memberId);
};
