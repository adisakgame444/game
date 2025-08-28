"use server";

import imagekit from "@/lib/imageKit";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadRecommendedProduct(
  formData: FormData
): Promise<void> {
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;

  if (!file) throw new Error("No file uploaded");

  // แปลงไฟล์เป็น Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // อัปโหลดไปยัง ImageKit
  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: `${Date.now()}-${file.name}`,
    folder: "/recommended-products",
  });

  // บันทึกลง DB
  await db.recommendedProduct.create({
    data: {
      name,
      imageUrl: uploadResponse.url,
      imageFileId: uploadResponse.fileId,
    },
  });

  // refresh หน้า admin ให้แสดงข้อมูลใหม่
  revalidatePath("/admin/recommended-products");

  // ส่งกลับไปหน้า list
  redirect("/admin/recommended-products");
}

export async function getRecommendedProducts() {
  return await db.recommendedProduct.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteRecommendedProduct(id: string) {
  const product = await db.recommendedProduct.findUnique({ where: { id } });
  if (!product) throw new Error("Product not found");

  // ลบไฟล์จาก ImageKit (ใช้ fileId)
  if (product.imageFileId) {
    await imagekit.deleteFile(product.imageFileId);
  }

  // ลบจาก DB
  await db.recommendedProduct.delete({ where: { id } });

  revalidatePath("/admin/recommended-products");
}
