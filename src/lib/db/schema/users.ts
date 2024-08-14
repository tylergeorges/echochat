import { User as SupabaseUser } from "@supabase/supabase-js";
import { pgSchema, pgTable, text, uuid } from "drizzle-orm/pg-core";

const SupaBaseAuthSchema = pgSchema("auth");

const SupabaseAuthUsers = SupaBaseAuthSchema.table("users", {
	id: uuid("id").primaryKey(),
});

export const users = pgTable("users", {
	id: uuid("id")
		.primaryKey()
		.notNull()
		.references(() => SupabaseAuthUsers.id, { onDelete: "cascade" }),
	username: text("username").notNull(),
	avatarUrl: text("avatar_url").notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type AuthUser = SupabaseUser;
