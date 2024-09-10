DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('Owner', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
