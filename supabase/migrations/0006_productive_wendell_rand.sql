ALTER TABLE "guilds" ALTER COLUMN "default_channel_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guild_members" ADD CONSTRAINT "guild_members_guild_id_member_id_pk" PRIMARY KEY("guild_id","member_id");--> statement-breakpoint
ALTER TABLE "guild_members" DROP COLUMN IF EXISTS "id";