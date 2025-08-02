'use client'

import { Button } from "@/components/ui/button";
import { Cannabis, Info, Percent, ShieldCheck, ShoppingBag,  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


const heroImage = [
  '/images/game-image.jpg',
  '/images/game-image.jpg',
  '/images/game-image.jpg'
]

export const Hero = () => {
  
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground via-muted to-primary/80 opacity-25" />
      <div className="container mx-auto relative px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-green-200 via-green-100 to-green-200 shadow-md ring-1 ring-green-400/30 backdrop-blur-sm">
              <Cannabis size={18} className="text-green-600 animate-bounce" />
              <span className="text-sm font-medium text-green-900">
               ยินดีต้อนรับสู่เว็บไซต์ TK Store
              </span>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                ช็อปสินค้าสายเขียว
                <br />
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                  ราคาคุ้มค่า
                </span>
              </h1>
              <p className="text-sm font-medium md:text-lg text-gray-700">
                มีบริการครบ พร้อมระบบฝากขายสินค้าของท่านอย่างมืออาชีพ
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white text-base font-medium rounded-full shadow-lg hover:bg-green-700 transition"
                asChild
                >
                <Link href="/">
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                  ช็อปเลย
                </Link>
              </Button>

              <Button
                variant="outline"
                className="group flex items-center justify-center gap-2 px-6 py-3 border border-green-600 text-green-700 hover:bg-green-50 rounded-full transition"
                asChild
                >
               <Link href="/about">
                 <Info size={18} className="group-hover:scale-110 transition-transform" />
                  เกี่ยวกับเรา
                </Link>
              </Button>
            </div>
          </div>

          

          {/* Right Content */}
          <div className="block relative">
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-[400px] lg:size-[500px] rounded-full bg-primary/10" />
              <div className="absolute size-[320px] lg:size-[400px] rounded-full border-2 border-primary/20" />
            </div> */}

            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-md">

              <div className="absolute top-5 right-5 flex items-center gap-2 bg-blue-600/90 text-white text-xs px-3 py-1.5 rounded-full shadow-xl z-10 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
                <span className="font-medium">รับประกันเต็มระบบ</span>
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-green-600/90 text-white text-xs px-3 py-1.5 rounded-full shadow-xl z-10 backdrop-blur-sm">
                <Percent className="w-4 h-4 text-white animate-bounce" />
                <span className="font-medium">ลดสูงสุด 50%</span>
              </div>

              <Swiper modules={[Autoplay]} autoplay={{ delay: 3500, disableOnInteraction: false}} loop className="w-full h-full">
                {heroImage.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className=" relative w-full h-full">
                      <Image src={src} alt={`Hero image ${i}`} fill className=" object-cover" priority={ i === 0 }/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
