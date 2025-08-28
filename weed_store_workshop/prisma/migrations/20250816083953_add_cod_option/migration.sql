/*
  Warnings:

  - You are about to drop the column `codOption` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "codOption",
ADD COLUMN     "cod" TEXT;

-- DropEnum
DROP TYPE "CodOption";
