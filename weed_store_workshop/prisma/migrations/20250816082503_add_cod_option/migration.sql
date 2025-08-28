/*
  Warnings:

  - You are about to drop the column `cod` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CodOption" AS ENUM ('yes', 'no');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cod",
ADD COLUMN     "codOption" TEXT;
