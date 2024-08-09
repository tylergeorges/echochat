'use server';

import { eq, sql } from 'drizzle-orm';

import { db } from '@/lib/db';
import { guildMembers, guilds, InsertGuild, Guild } from '@/lib/db/schema';
import { insertChannel } from '@/lib/db/queries/channel';
import { insertGuildMember } from '@/lib/db/queries/user';

export const guildsForMember = async (memberId: string): Promise<Guild[]> =>
  // @ts-expect-error
  db
    .select({
      name: guilds.name,
      id: guilds.id,
      icon: guilds.icon,
      ownerId: guilds.ownerId,
      isOwner: sql<boolean>`${guilds.ownerId}=${guildMembers.memberId}`
    })
    .from(guildMembers)
    .fullJoin(guilds, eq(guildMembers.guildId, guilds.id))
    .where(eq(guildMembers.memberId, memberId));

export const insertGuild = async ({ name, ownerId, icon }: InsertGuild) => {
  const [res] = await db.insert(guilds).values({ name, ownerId, icon }).returning();

  await insertChannel({
    name: 'general',
    guildId: res.id
  });

  await insertGuildMember({ guildId: res.id, memberId: ownerId });
};

export const getGuildInfo = async (guildId: string, userId: string) =>
  db
    .select({
      name: guilds.name,
      id: guilds.id,
      ownerId: guilds.ownerId,
      isOwner: sql<boolean>`${guilds.ownerId}=${userId}`
    })
    .from(guilds)
    .where(eq(guilds.id, guildId));
