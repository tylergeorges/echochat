ALTER TABLE "guild_members" DROP CONSTRAINT "guild_members_member_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "guild_members" ADD CONSTRAINT "guild_members_member_id_users_id_fk" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
