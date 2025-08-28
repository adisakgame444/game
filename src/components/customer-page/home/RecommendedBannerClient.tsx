"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface Banner {
  id: string;
  name: string | null;
  imageUrl: string;
}

interface Props {
  banners: Banner[];
}

// autoplay plugin
function AutoplayPlugin(slider: KeenSliderInstance) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 3000); // เลื่อนทุก 3 วิ
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function RecommendedBannerClient({ banners }: Props) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3, // ✅ กำหนดให้โชว์ 3 คอลัมน์
        spacing: 10, // ✅ ระยะห่างระหว่างรูป
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 4, spacing: 15 }, // tablet / desktop = 4
        },
        "(min-width: 1280px)": {
          slides: { perView: 5, spacing: 20 }, // จอใหญ่พิเศษ = 5
        },
      },
      mode: "free-snap",
      renderMode: "precision",
      drag: true,
    },
    [AutoplayPlugin]
  );

  if (!banners || banners.length === 0) {
    return <div className="text-center text-gray-500">ยังไม่มีแบนเนอร์</div>;
  }

  return (
    // className="bg-black"
    <div>
      <div className="px-4 lg:px-30 mb-5">
        <div className="flex items-center mt-2">
          {/* เส้นซ้าย (สีเขียว) */}
          <div className="h-[2px] flex-1 bg-green-500"></div>

          {/* ข้อความ + ไอคอนซ้ายขวา */}
          <div className="px-4 flex items-center gap-2">
            {/* ไอคอนซ้าย */}
            <div className="animate-bounce-slow">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>

            {/* ข้อความตรงกลาง */}
            <span className="text-lg md:text-2xl font-semibold text-gray-700">
              สินค้าแนะนำ
            </span>

            {/* ไอคอนขวา */}
            <div className="animate-bounce-slow">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
          </div>

          {/* เส้นขวา (สีเขียว) */}
          <div className="h-[2px] flex-1 bg-green-500"></div>
        </div>{" "}
        <div ref={sliderRef} className="keen-slider">
          {banners.map((banner) => (
            <div key={banner.id} className="keen-slider__slide">
              <div className="relative h-40 md:h-100 lg:h-150 overflow-hidden rounded-xl shadow-md">
                <Image
                  src={banner.imageUrl}
                  alt={banner.name || "recommended banner"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
