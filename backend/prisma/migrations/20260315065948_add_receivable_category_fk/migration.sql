/*
  Warnings:

  - You are about to drop the column `category` on the `accounts_receivable` table. All the data in the column will be lost.
  - Added the required column `idaccount_receivable_category` to the `accounts_receivable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts_receivable` DROP COLUMN `category`,
    ADD COLUMN `idaccount_receivable_category` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `accounts_receivable_idaccount_receivable_category_idx` ON `accounts_receivable`(`idaccount_receivable_category`);

-- AddForeignKey
ALTER TABLE `accounts_receivable` ADD CONSTRAINT `accounts_receivable_idaccount_receivable_category_fkey` FOREIGN KEY (`idaccount_receivable_category`) REFERENCES `accounts_receivable_category`(`idaccount_receivable_category`) ON DELETE RESTRICT ON UPDATE CASCADE;
