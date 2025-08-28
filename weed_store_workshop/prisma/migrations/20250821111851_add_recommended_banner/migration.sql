-- CreateTable
CREATE TABLE "RecommendedBanner" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "imageFileId" TEXT,

    CONSTRAINT "RecommendedBanner_pkey" PRIMARY KEY ("id")
);
