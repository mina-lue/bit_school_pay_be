/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `BitUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BitUser_email_key" ON "public"."BitUser"("email");
