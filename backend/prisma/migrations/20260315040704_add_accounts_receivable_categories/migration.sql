-- CreateTable
CREATE TABLE `accounts_receivable_category` (
    `idaccount_receivable_category` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `color` INTEGER NOT NULL,

    PRIMARY KEY (`idaccount_receivable_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
