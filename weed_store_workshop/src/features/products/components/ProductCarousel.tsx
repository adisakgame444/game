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
      slidesPerView={3} // 👉 แสดง 3 รูปต่อแถว
      spaceBetween={10} // 👉 ระยะห่างระหว่างรูป
      pagination={{ clickable: true }} // 👉 จุดบอกตำแหน่ง
      autoplay={{
        delay: 3000, // 👉 หน่วงเวลา 3 วินาที
        disableOnInteraction: false, // 👉 ให้เล่นต่อหลังจากที่ user swipe เอง
      }}
      loop={true} // 👉 ทำให้วนลูป
      className="w-full"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="flex justify-center">
            <Image
              src={img}
              alt={`product-${i}`}
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
