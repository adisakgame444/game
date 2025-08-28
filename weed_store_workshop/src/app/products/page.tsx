import ContactFooter from "@/components/customer-page/home/contact";
import LoginRequired from "@/components/customer-page/orders/LoginRequired";
import OrdersList from "@/components/customer-page/orders/ordersList";
import { authCheck } from "@/features/auths/db/auths";
import { getRecommendedProducts } from "@/features/recommended-products/recommended";
import { db } from "@/lib/db";
import { ShoppingBag } from "lucide-react";
// import Image from "next/image";
import ProductCarousel from "@/features/products/components/ProductCarousel";

type Product = {
  id: string; // แก้จาก string → number
  imageUrl: string;
  name: string;
  createdAt: Date;
};

export default async function OrdersPage() {
  // ตรวจสอบ user
  const customer = await authCheck();
  if (!customer) {
    return <LoginRequired />;
  }

  const products: Product[] = await getRecommendedProducts();

  // ดึง orders ของลูกค้า (เอา Paid และ Cancelled)
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  // 1) อัปเดต order ที่ Shipped เกิน 1 วัน -> เป็น Delivered
  await db.order.updateMany({
    where: {
      status: "Shipped",
      createdAt: { lte: oneDayAgo }, // ถ้าส่งแล้วเกิน 1 วัน
    },
    data: {
      status: "Delivered",
    },
  });

  // 2) ลบ order ที่ Delivered เกิน 3 วัน
  await db.order.deleteMany({
    where: {
      status: "Delivered",
      createdAt: { lte: threeDaysAgo }, // ส่งแล้วเกิน 3 วัน
    },
  });

  const orders = await db.order.findMany({
    where: {
      customerId: customer.id,
      OR: [
        { status: "Paid", createdAt: { gte: oneDayAgo } }, // จ่ายเงินแล้ว
        { status: "Cancelled", createdAt: { gte: oneDayAgo } }, // ยกเลิก
        { status: "Shipped" }, // จัดส่งแล้ว
        { status: "Delivered" }, // ส่งแล้ว
        { status: "TrackingNumber" }, //รอเลขพัสดุ
      ],
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              images: {
                select: {
                  url: true,
                  isMain: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-4 py-1 md:container md:mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mt-4">
          <ShoppingBag className="w-7 h-7 text-green-600" />
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            คลังซื้อของฉัน
          </h1>
        </div>

        <div className="p-1">
          <h2 className="text-lg font-semibold mb-4">สินค้าแนะนำ</h2>
          <ProductCarousel images={products.map((item) => item.imageUrl)} />
        </div>

        {/* Orders */}
        <div className="mt-1">
          <OrdersList orders={orders} />
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <ContactFooter />
      </div>
    </div>
  );
}
