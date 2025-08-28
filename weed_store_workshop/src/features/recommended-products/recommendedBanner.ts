"use server";

import { db } from "@/lib/db";
import imagekit from "@/lib/imageKit";

export async function getRecommendedBanners() {
  return await db.recommendedBanner.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function uploadRecommendedBanner(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadRes = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });

  console.log("UploadRes:", uploadRes);
  console.log("UploadRes URL:", uploadRes.url);

  const banner = await db.recommendedBanner.create({
    data: {
      imageUrl: uploadRes.url, // ✅ เก็บ URL จริง
      name: file.name,
      fileId: uploadRes.fileId, // เผื่ออนาคตจะใช้ลบ
    },
  });

  return banner;
}

export async function deleteRecommendedBanner(id: string) {
  const banner = await db.recommendedBanner.findUnique({ where: { id } });
  if (!banner) return { success: false };

  await db.recommendedBanner.delete({ where: { id } });
  return { success: true };
}
