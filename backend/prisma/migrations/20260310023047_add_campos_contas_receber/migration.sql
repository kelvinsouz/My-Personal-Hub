/*
  Warnings:

  - Added the required column `categoria` to the `contas_receber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `contas_receber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `contas_receber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contas_receber` ADD COLUMN `categoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
