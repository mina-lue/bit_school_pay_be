/*
  Warnings:

  - You are about to drop the column `staffIds` on the `School` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."BitUser" ADD COLUMN     "schoolId" TEXT;

-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "staffIds";

-- AddForeignKey
ALTER TABLE "public"."BitUser" ADD CONSTRAINT "BitUser_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
