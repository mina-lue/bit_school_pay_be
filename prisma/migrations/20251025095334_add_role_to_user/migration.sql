-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'STAFF', 'BASIC');

-- AlterTable
ALTER TABLE "public"."BitUser" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'BASIC';
