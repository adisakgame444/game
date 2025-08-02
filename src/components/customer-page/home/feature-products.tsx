'use server'

// import { Button } from "@/components/ui/button";
import { getFeatureProducts } from "@/features/products/db/products";
import { ArrowRight, BadgeCheck } from "lucide-react";
// import Link from "next/link";
// import ProductCard from "../products/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductSearch from "./productSearch";

const FeatureProducts = async () => {
 
  const products = await getFeatureProducts();
 
  return (
    <section className="container mx-auto px-4 py-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
        <div>
          <div className="flex mb-3 items-center gap-2 px-5 py-2 bg-green-100 text-green-800 border border-green-300 rounded-full shadow-sm">
            <BadgeCheck size={16} className="text-green-500" />
            <span className="text-sm font-medium">สินค้าดี ราคาถูก ส่งรวดเร็ว</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative inline-block after:block after:h-1 after:bg-green-400 after:w-12 after:mt-1">
            สินค้าทั้งหมด
          </h2>

        </div>

        <Button variant="ghost" className="group px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transition">
          <Link href="/cart" className="flex items-center gap-2">
          <span className="text-sm font-medium">ดูสินค้าในตะกร้า</span>
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
          </Link>
        </Button>

      </div>
      
      <div className="marquee-container">
        <div className="marquee-text">
          🎉 พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ! 🎉 พบกับสินค้าใหม่ๆ ทุกสัปดาห์ พร้อมโปรโมชั่นสุดพิเศษ! 🥦🥦🥦🥦🥦
        </div>
      </div>

      <ProductSearch products={products}/>


      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div> */}

    </section>
  );
};

export default FeatureProducts;
