'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { InsertMessage, messages, users } from '@/lib/db/schema';

export const selectMessagesForChannel = async (channelId: string) =>
  db
    .select({
      content: messages.content,
      id: messages.id,
      createdAt: messages.createdAt,
      channelId: messages.channelId,
      author: {
        username: users.username,
        id: users.id,
        avatarUrl: users.avatarUrl
      }
    })
    .from(messages)
    .innerJoin(users, eq(users.id, messages.authorId))
    .where(eq(messages.channelId, channelId));

export type Message = Awaited<ReturnType<typeof selectMessagesForChannel>>[number] & {
  state?: 'sending' | 'error';
};

export const insertMessage = async (messageToInsert: InsertMessage) => {
  const [message] = await db.insert(messages).values(messageToInsert).returning();

  return db
    .select({
      content: messages.content,
      id: messages.id,
      createdAt: messages.createdAt,
      channelId: messages.channelId,
      author: {
        username: users.username,
        id: users.id,
        avatarUrl: users.avatarUrl
      }
    })
    .from(messages)
    .innerJoin(users, eq(users.id, messages.authorId))
    .where(eq(messages.id, message.id));
};
