'use client';

import { ArrowUp } from "lucide-react"; // ใช้ icon ลูกศรขึ้น
// import { useEffect } from "react";

const AllProducts = () => {
  const handleScrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 500); // หน่วงเล็กน้อยให้ดูสมูธขึ้น
 };


  return (
    <div className="flex justify-center">
      <button
        className="inline-flex items-center gap-2 px-6 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition"
        onClick={handleScrollToTop}
      >
        <ArrowUp size={16} />
        กลับไปด้านบน
      </button>
    </div>
  );
};

export default AllProducts;


