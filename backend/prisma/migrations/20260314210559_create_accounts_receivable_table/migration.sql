/*
  Warnings:

  - You are about to drop the `contas_receber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `contas_receber`;

-- CreateTable
CREATE TABLE `accounts_receivable` (
    `idaccount_receivable` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idaccount_receivable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
