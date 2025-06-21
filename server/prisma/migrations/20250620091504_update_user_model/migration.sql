/*
  Warnings:

  - You are about to drop the column `createdat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `joindate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastlogin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `totalspent` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdat`,
    DROP COLUMN `joindate`,
    DROP COLUMN `lastlogin`,
    DROP COLUMN `totalspent`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `joinDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL,
    ADD COLUMN `totalSpent` DECIMAL(65, 30) NOT NULL DEFAULT 0.00;
