/*
  Warnings:

  - The primary key for the `RecommendedProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RecommendedProduct" DROP CONSTRAINT "RecommendedProduct_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecommendedProduct_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecommendedProduct_id_seq";
