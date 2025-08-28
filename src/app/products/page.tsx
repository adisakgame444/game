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
      <section className="px-4 py-1 md:container md:mx-auto md:max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-2 mt-2 md:mt-4">
          <ShoppingBag className="w-7 h-7 md:h-10 md:w-10 text-green-600" />
          <h1 className="text-xl md:text-3xl font-extrabold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            คลังซื้อของฉัน
          </h1>
        </div>
        <div>
          <div className="p-1">
            <div className="flex justify-center md:justify-around gap-8 md:gap-12 my-2 md:my-10">
              {/* บ้าน */}
              <div className="flex flex-col items-center text-green-600 hover:scale-110 transition-transform">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-green-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9.75L12 4l9 5.75M4.5 10.5v8.25a1.5 1.5 0 001.5 1.5h4.5v-6h3v6H18a1.5 1.5 0 001.5-1.5V10.5"
                    />
                  </svg>
                </div>
                <span className="text-xs md:text-base font-medium mt-1">
                  สะดวก
                </span>
              </div>

              {/* สายฟ้า */}
              <div className="flex flex-col items-center text-yellow-500 hover:scale-110 transition-transform">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-yellow-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs md:text-base font-medium mt-1">
                  รวดเร็ว
                </span>
              </div>

              {/* เหรียญ $ */}
              <div className="flex flex-col items-center text-fuchsia-600 hover:scale-110 transition-transform">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-fuchsia-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v8m0-8c-1.5 0-2.5.75-2.5 2s1 2 2.5 2 2.5.75 2.5 2-1 2-2.5 2"
                    />
                  </svg>
                </div>
                <span className="text-xs md:text-base font-medium mt-1">
                  คุ้มค่า
                </span>
              </div>

              {/* ตรงปก */}
              <div className="flex flex-col items-center text-blue-500 hover:scale-110 transition-transform">
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-blue-200 bg-white shadow-sm hover:shadow-md transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-xs md:text-base font-medium mt-1">
                  ตรงปก
                </span>
              </div>
            </div>
          </div>
        </div>
        <ProductCarousel images={products.map((item) => item.imageUrl)} />

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
