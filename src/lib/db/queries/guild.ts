'use server';

import { and, eq, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '@/lib/db';
import { guilds, InsertGuild, guildMembers } from '@/lib/db/schema/guilds';

import { insertChannel } from '@/lib/db/queries/channel';
import { insertGuildMember } from '@/lib/db/queries/user';

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

  await insertGuildMember({ guildId: res.id, memberId: ownerId });
};

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
          ownerId: true,
          defaultChannelId: true
        },

        extras: {
          isOwner: sql<boolean>`${guilds.ownerId}=${memberId}`.as('is_owner')
        }
      }
    }
  });
