'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { channels, InsertChannel } from '@/lib/db/schema';

export const insertChannel = async (channel: InsertChannel) =>
  db.insert(channels).values(channel).returning();

export const selectChannelsForGuild = async (guildId: string) =>
  db.select().from(channels).where(eq(channels.guildId, guildId));

export const getChannelInfo = async (channelId: string) =>
  db.select().from(channels).where(eq(channels.id, channelId));
