/*
  Warnings:

  - Added the required column `name` to the `RecommendedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecommendedProduct" ADD COLUMN     "name" TEXT NOT NULL;
