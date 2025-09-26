/*
  Warnings:

  - You are about to drop the column `LastName` on the `BitUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[principalId]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastName` to the `BitUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `BitUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principalId` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BitUser" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "principalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "School_principalId_key" ON "public"."School"("principalId");

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."School" ADD CONSTRAINT "School_principalId_fkey" FOREIGN KEY ("principalId") REFERENCES "public"."BitUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
