-- AlterTable
ALTER TABLE `order` ADD COLUMN `bank_reference_id` VARCHAR(191) NULL,
    ADD COLUMN `merchant_order_id` VARCHAR(191) NULL,
    ADD COLUMN `payment_mode` VARCHAR(191) NOT NULL DEFAULT 'COD',
    ADD COLUMN `transaction_id` VARCHAR(191) NULL;
