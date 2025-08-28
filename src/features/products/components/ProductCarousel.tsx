"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function ProductCarousel({ images }: Props) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={16} // ✅ กำหนดระยะห่างระหว่างรูป
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full px-2"
      breakpoints={{
        0: {
          slidesPerView: 3, // ✅ มือถือ 3 คอลัมน์
        },
        1024: {
          slidesPerView: 5, // ✅ Desktop 5 คอลัมน์
        },
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md bg-white">
            <Image
              src={img}
              alt={`product-${i}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
