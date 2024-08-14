'use server';

import { cache } from 'react';

import { eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { type InsertGuildMember, guildMembers } from '@/lib/db/schema/guilds';
import { type InsertUser, users } from '@/lib/db/schema/users';

export const userById = cache(async (userId: string) =>
  db.select().from(users).where(eq(users.id, userId))
);

export const insertUser = async (user: InsertUser) => db.insert(users).values(user).returning();

export const insertGuildMember = async (guildMember: InsertGuildMember) =>
  db.insert(guildMembers).values(guildMember).returning();
