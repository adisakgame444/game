/*
  Warnings:

  - You are about to drop the column `imageFileId` on the `RecommendedBanner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecommendedBanner" DROP COLUMN "imageFileId",
ADD COLUMN     "fileId" TEXT;
