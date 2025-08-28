"use server";

import { getFeatureProducts } from "@/features/products/db/products";
import { ArrowRight, BadgeCheck, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductSearch from "./productSearch";

const FeatureProducts = async () => {
  const products = await getFeatureProducts();

  return (
    <section className="container mx-auto px-4 py-1">
      <div className="flex flex-wrap justify-between items-center mb-1">
        <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-800 rounded-2xl shadow-md w-fit border border-green-200">
          <div className="bg-green-500 p-1 rounded-full">
            <BadgeCheck size={20} className="text-white" />
          </div>
          <span className="text-sm font-semibold">
            สินค้าดี ราคาถูก ส่งรวดเร็ว
          </span>
        </div>


        {/* Section: Title + Cart Button */}
        <div className="flex items-center justify-between w-full mt-4 mb-2">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <span className="inline-block w-1.5 h-8 bg-green-500 rounded-sm"></span>
            สินค้าทั้งหมด
          </h3>

          <Button
            variant="ghost"
            className="group px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-medium whitespace-nowrap"
          >
            <Link href="/cart" className="flex items-center gap-2">
              <span>ดูสินค้าในตะกร้า</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </div>

      <div className="marquee-container flex items-center gap-2">
        {/* กล่องประกาศ */}
        <div className="flex items-center gap-2 rounded-[5px] bg-yellow-100 text-yellow-900 px-3 py-1 shadow-sm w-max">
          <Megaphone size={16} className="text-yellow-700" />
          <span className="text-xs md:text-sm font-medium">ประกาศ</span>
        </div>

        {/* กล่องข้อความเลื่อน */}
        <div className="overflow-hidden w-full">
          <div className="marquee-text text-[12px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
            🎉 พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ! 🎉
            พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ! 🥦
          </div>
        </div>
      </div>

      <ProductSearch products={products} />
    </section>
  );
};

export default FeatureProducts;
