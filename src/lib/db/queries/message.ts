'use server';

import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { type InsertMessage, type SelectMessage, messages } from '@/lib/db/schema/messages';
import { users } from '@/lib/db/schema/users';

export interface PageCursor {
  id: string;
  createdAt: Date;
}

export const selectMessagesForChannel = async (
  channelId: string,
  cursor?: PageCursor,
  page = 1,
  pageSize = 30
) => {
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
    .where(
      cursor
        ? and(eq(messages.channelId, channelId), and(eq(messages.id, cursor.id)))
        : eq(messages.channelId, channelId)
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize)
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
