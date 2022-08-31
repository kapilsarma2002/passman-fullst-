/*
  Warnings:

  - You are about to drop the column `accoutEmail` on the `UserInfo` table. All the data in the column will be lost.
  - Added the required column `accountEmail` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserInfo` DROP COLUMN `accoutEmail`,
    ADD COLUMN `accountEmail` VARCHAR(191) NOT NULL;
