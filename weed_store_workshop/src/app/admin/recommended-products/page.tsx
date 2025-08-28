import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  uploadRecommendedProduct,
  deleteRecommendedProduct,
} from "@/features/recommended-products/recommended";
// import Form from "next/form";
import Image from "next/image";
import { getRecommendedProducts } from "@/features/recommended-products/recommended";

export default async function RecommendedProductsPage() {
  const products = await getRecommendedProducts();
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* การ์ดเพิ่มสินค้า */}
      <Card>
        <CardHeader>
          <CardTitle>เพิ่มสินค้าแนะนำ</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={uploadRecommendedProduct} className="space-y-4">
            <Input type="text" name="name" placeholder="ชื่อสินค้า" required />
            <Input type="file" name="file" accept="image/*" required />
            <Button type="submit" className="w-full">
              บันทึกข้อมูล
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* การ์ดแสดงสินค้า */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้าแนะนำ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-xl shadow p-3 flex flex-col items-center w-full"
              >
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={160}
                  height={160}
                  className="rounded-lg object-cover w-full h-[160px] md:h-[260px] md:w-[160px]"
                />

                <p className="text-gray-800 font-medium text-center mt-2 line-clamp-1">
                  {p.name}
                </p>

                <form
                  action={async () => {
                    "use server";
                    await deleteRecommendedProduct(p.id);
                  }}
                  className="w-full mt-2"
                >
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full"
                  >
                    ลบ
                  </Button>
                </form>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
