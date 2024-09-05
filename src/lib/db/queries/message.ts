'use server';

import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { type InsertMessage, type SelectMessage, messages } from '@/lib/db/schema/messages';
import { users } from '@/lib/db/schema/users';

export const selectMessagesForChannel = async (channelId: string, page = 0, pageSize = 30) => {
  const sq = db
    .select({ id: messages.id })
    .from(messages)
    .innerJoin(users, eq(users.id, messages.authorId))
    .where(and(eq(messages.channelId, channelId)))
    .limit(pageSize)
    .offset(page === 0 ? pageSize : (page - 1) * pageSize)
    .as('sq');

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
    .where(and(eq(messages.channelId, channelId)))
    .innerJoin(users, eq(users.id, messages.authorId))
    .innerJoin(sq, eq(messages.id, sq.id))
    .orderBy(asc(messages.createdAt));
};

export type Message = Prettify<
  QueryReturnType<typeof selectMessagesForChannel> & {
    state?: 'sending' | 'error';
  }
>;

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

export const transformBaseMessage = async (base: SelectMessage): Promise<Message[]> =>
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
    .where(eq(messages.id, base.id));
