import { db } from "@/lib/db";
import RecommendedBannerClient from "./RecommendedBannerClient";

export default async function RecommendedBanner() {
  const banners = await db.recommendedBanner.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (banners.length === 0) return null;

  return <RecommendedBannerClient banners={banners} />;
}
