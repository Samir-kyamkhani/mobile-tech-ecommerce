/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_sku_key` ON `Category`(`sku`);
