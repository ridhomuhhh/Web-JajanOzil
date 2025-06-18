/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `LaporanHarian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MitraHarian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLaporanHarian` INTEGER NOT NULL,
    `namaMitra` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdukDititipkan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idMitraHarian` INTEGER NOT NULL,
    `namaProduk` VARCHAR(191) NOT NULL,
    `jumlahTitip` INTEGER NOT NULL,
    `sisa` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,
    `produkTerjual` INTEGER NOT NULL DEFAULT 0,
    `totalPendapatan` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MitraHarian` ADD CONSTRAINT `MitraHarian_idLaporanHarian_fkey` FOREIGN KEY (`idLaporanHarian`) REFERENCES `LaporanHarian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProdukDititipkan` ADD CONSTRAINT `ProdukDititipkan_idMitraHarian_fkey` FOREIGN KEY (`idMitraHarian`) REFERENCES `MitraHarian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
