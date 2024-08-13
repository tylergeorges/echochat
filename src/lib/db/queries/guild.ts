'use server';

import { and, eq, sql } from 'drizzle-orm';
import { randomUUID } from 'crypto';

import { db } from '@/lib/db';
import { guilds, InsertGuild, Guild, guildMembers } from '@/lib/db/schema/guilds';

import { insertChannel } from '@/lib/db/queries/channel';
import { insertGuildMember } from '@/lib/db/queries/user';

export const guildsForMember = async (memberId: string) =>
  db.query.guildMembers.findMany({
    where: eq(guildMembers.memberId, memberId),
    // where: eq(guilds.id, guildMembers.guildId),
    columns: {
      // name: true,
      // id: true,
      // icon: true,
      // ownerId: true
    },

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
      // members: {
      //   where: (members, { eq }) => eq(members.memberId, memberId)
      // }
    }
  });
// @ts-expect-error

// .select({
// name: guilds.name,
// id: guilds.id,
// icon: guilds.icon,
// ownerId: guilds.ownerId,
//   isOwner: sql<boolean>`${guilds.ownerId}=${guildMembers.memberId}`
// })
// .from(guildMembers)
// .fullJoin(guilds, eq(guildMembers.guildId, guilds.id))
// .where(eq(guildMembers.memberId, memberId));
// export const guildsForMember = async (memberId: string): Promise<Guild[]> =>
//   // @ts-expect-error
//   db
//     .select({
//       name: guilds.name,
//       id: guilds.id,
//       icon: guilds.icon,
//       ownerId: guilds.ownerId,
//       isOwner: sql<boolean>`${guilds.ownerId}=${guildMembers.memberId}`
//     })
//     .from(guildMembers)
//     .fullJoin(guilds, eq(guildMembers.guildId, guilds.id))
//     .where(eq(guildMembers.memberId, memberId));

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
    
    columns:{},
    
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
// .select({
//   name: guilds.name,
//   id: guilds.id,
//   ownerId: guilds.ownerId,
//   defaultChannelId: guilds.defaultChannelId,
//   isOwner: sql<boolean>`${guilds.ownerId}=${userId}`
// })
// .from(guilds)
// .where(eq(guilds.id, guildId));
// db
//   .select({
//     name: guilds.name,
//     id: guilds.id,
//     ownerId: guilds.ownerId,
//     defaultChannelId: guilds.defaultChannelId,
//     isOwner: sql<boolean>`${guilds.ownerId}=${userId}`
//   })
//   .from(guilds)
//   .where(eq(guilds.id, guildId));

export const getGeneralChannel = async (guildId: string, memberId: string) =>
  db
    .select({
      defaultChannelId: guilds.defaultChannelId
    })
    .from(guilds)
    .where(
      and(
        eq(guilds.id, guildId)
        // eq(guildMembers.guildId, guilds.id),
        // eq(guildMembers.memberId, memberId)
      )
    );
