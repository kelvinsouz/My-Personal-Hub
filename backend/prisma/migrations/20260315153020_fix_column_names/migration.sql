/*
  Warnings:

  - The primary key for the `accounts_receivable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idaccount_receivable` on the `accounts_receivable` table. All the data in the column will be lost.
  - You are about to drop the column `idaccount_receivable_category` on the `accounts_receivable` table. All the data in the column will be lost.
  - The primary key for the `accounts_receivable_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idaccount_receivable_category` on the `accounts_receivable_category` table. All the data in the column will be lost.
  - Added the required column `account_receivable_category_id` to the `accounts_receivable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_receivable_id` to the `accounts_receivable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_receivable_category_id` to the `accounts_receivable_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts_receivable` DROP FOREIGN KEY `accounts_receivable_idaccount_receivable_category_fkey`;

-- DropIndex
DROP INDEX `accounts_receivable_idaccount_receivable_category_idx` ON `accounts_receivable`;

-- AlterTable
ALTER TABLE `accounts_receivable` DROP PRIMARY KEY,
    DROP COLUMN `idaccount_receivable`,
    DROP COLUMN `idaccount_receivable_category`,
    ADD COLUMN `account_receivable_category_id` INTEGER NOT NULL,
    ADD COLUMN `account_receivable_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`account_receivable_id`);

-- AlterTable
ALTER TABLE `accounts_receivable_category` DROP PRIMARY KEY,
    DROP COLUMN `idaccount_receivable_category`,
    ADD COLUMN `account_receivable_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`account_receivable_category_id`);

-- CreateIndex
CREATE INDEX `accounts_receivable_account_receivable_category_id_idx` ON `accounts_receivable`(`account_receivable_category_id`);

-- AddForeignKey
ALTER TABLE `accounts_receivable` ADD CONSTRAINT `accounts_receivable_account_receivable_category_id_fkey` FOREIGN KEY (`account_receivable_category_id`) REFERENCES `accounts_receivable_category`(`account_receivable_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
