"use client";

import { useEffect, useState } from "react";
import {
  uploadRecommendedBanner,
  deleteRecommendedBanner,
  getRecommendedBanners,
} from "@/features/recommended-products/recommendedBanner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RecommendedBanner } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function RecommendedBannerProductsPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [banners, setBanners] = useState<RecommendedBanner[]>([]);

  // โหลด banners
  useEffect(() => {
    async function fetchBanners() {
      const data = await getRecommendedBanners();
      setBanners(data);
    }
    fetchBanners();
  }, []);

  // อัปโหลด
  async function handleSubmit(formData: FormData) {
    const banner = await uploadRecommendedBanner(formData);
    setPreview(banner.imageUrl);
    setBanners((prev) => [banner, ...prev]);
  }

  // ลบ
  async function handleDelete(id: string) {
    const res = await deleteRecommendedBanner(id);
    if (res.success) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  }

  return (
    <Card>
      <CardContent>
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Upload Recommended Banner</h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
            className="flex items-center gap-2 mb-6"
          >
            <Input type="file" name="image" accept="image/*" required />
            <Button type="submit">Upload</Button>
          </form>

          {/* Preview ก่อนอัปโหลด */}
          {preview && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <div className="relative w-60 h-40">
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="rounded-lg object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* แสดง banners ที่อัปโหลดแล้ว */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Uploaded Banners</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="bg-white rounded-xl shadow p-3 flex flex-col"
                >
                  {/* รูปภาพ */}
                  <div className="relative w-full h-40 mb-3">
                    <Image
                      src={banner.imageUrl}
                      alt="banner"
                      fill
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                  </div>

                  {/* ปุ่มลบ */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
