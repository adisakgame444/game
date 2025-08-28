import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

export default function NoOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      {/* ไอคอนกล่องว่าง */}
      <PackageOpen className="w-16 h-16 text-gray-400 mb-4" />

      {/* ข้อความหลัก */}
      <p className="text-xl font-semibold">ยังไม่มีคำสั่งซื้อ</p>

      {/* ข้อความรอง */}
      <p className="text-sm text-gray-400 mt-1">
        คุณยังไม่ได้สั่งซื้อสินค้าใด ๆ
      </p>

      {/* ปุ่มไปเลือกซื้อ */}

      <Link href="/">
        <Button className="mt-6 px-6 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white">
          เลือกซื้อสินค้า
        </Button>
      </Link>
    </div>
  );
}
