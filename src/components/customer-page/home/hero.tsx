"use client";

import { Button } from "@/components/ui/button";
import { Cannabis, Info, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const heroImage = [
  "/images/TK-image1.jpg",
  "/images/TK-image2.jpg",
  "/images/TK-image3.jpg",
];

const heroImages = [
  "/images/game-image1.jpg",
  "/images/game-image2.jpg",
  // '/images/game-image.jpg'
];

export const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          loop
        >
          {heroImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-screen bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${src})`,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10" />
      </div>
      <div className="container mx-auto relative px-4 pt-4 pb-8 md:pt-12 md:pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-green-200 via-green-100 to-green-200 shadow-md ring-1 ring-green-400/30 backdrop-blur-sm">
              <Cannabis size={18} className="text-green-600 animate-bounce" />
              <span className="text-sm font-medium text-green-900">
                ยินดีต้อนรับสู่เว็บไซต์ DOAG THAI
              </span>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white/80">
                ช็อปสินค้าสายเขียว
                <br />
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                  ราคาคุ้มค่า
                </span>
              </h1>
              <p className="text-sm font-medium md:text-lg text-white/75">
                มีบริการครบ
              </p>
              <p className="text-sm font-medium md:text-sx text-white/75">
                💚 พร้อมระบบฝากขายสินค้าของท่านอย่างมืออาชีพ 💚
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white text-base font-medium rounded-full shadow-lg hover:bg-green-700 transition"
                asChild
              >
                <Link href="/">
                  <ShoppingBag
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  ช็อปเลย
                </Link>
              </Button>

              <Button
                variant="outline"
                className="group flex items-center justify-center gap-2 px-6 py-3 border border-green-600 text-green-700 hover:bg-green-50 rounded-full transition"
                asChild
              >
                <Link href="/contact">
                  <Info
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  เกี่ยวกับเรา
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="block relative">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-md">
              {/* <div className="absolute top-1 right-1 flex items-center gap-1 bg-blue-600/90 text-white text-xs px-2 py-1.5 rounded-full shadow-xl z-10 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-white animate-pulse" />
                <span className="font-medium">รับประกันเต็มระบบ</span>
              </div>

              <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-blue-600/90 text-white text-xs px-2 py-1.5 rounded-full shadow-xl z-10 backdrop-blur-sm">
                <Percent className="w-4 h-4 text-white animate-bounce" />
                <span className="font-medium">ลดสูงสุด 50%</span>
              </div> */}

              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                loop
                className="w-full h-full"
              >
                {heroImage.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full z-10 mx-auto box-slide-left-sync">
                      <Image
                        src={src}
                        alt={`Hero image ${i}`}
                        fill
                        className="rounded-lg shadow-lg object-cover"
                        priority={i === 0}
                      />
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
