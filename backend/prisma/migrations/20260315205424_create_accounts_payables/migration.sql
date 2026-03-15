-- CreateTable
CREATE TABLE `accounts_payable` (
    `account_payable_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `account_payable_category_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `accounts_payable_account_payable_category_id_idx`(`account_payable_category_id`),
    PRIMARY KEY (`account_payable_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts_payable_category` (
    `account_payable_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`account_payable_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts_payable` ADD CONSTRAINT `accounts_payable_account_payable_category_id_fkey` FOREIGN KEY (`account_payable_category_id`) REFERENCES `accounts_payable_category`(`account_payable_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
