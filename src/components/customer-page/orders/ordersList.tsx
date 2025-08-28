"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import NoOrders from "./NoOrders";

type OrderItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    images?: { url: string; isMain?: boolean }[];
  };
};

type Order = {
  id: string;
  status: string;
  createdAt: Date;
  items: OrderItem[];
};

interface OrdersListProps {
  orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return <NoOrders />;
  }

  return (
    <Card>
      <CardContent>
        <CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:p-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl shadow p-2 border border-gray-200 bg-white md:mb-2 mb-3"
              >
                {/* Header: Order ID + Status */}
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm truncate max-w-[65%]">
                    เลขที่ออเดอร์: {order.id}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
        ${
          order.status === "Paid"
            ? "bg-blue-100 text-blue-700"
            : order.status === "Cancelled"
              ? "bg-red-100 text-red-700"
              : order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "TrackingNumber"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Shipped"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700"
        }`}
                  >
                    {order.status === "Paid"
                      ? "ชำระเงินแล้ว"
                      : order.status === "Cancelled"
                        ? "ยกเลิก"
                        : order.status === "Delivered"
                          ? "ส่งแล้ว"
                          : order.status === "TrackingNumber"
                            ? "รอเลขพัสดุ"
                            : order.status === "Shipped"
                              ? "กำลังจัดส่ง"
                              : order.status}                            
                  </span>
                </div>

                {/* วันที่ + ราคา */}
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>
                    วันที่:{" "}
                    {new Date(order.createdAt).toLocaleDateString("th-TH")}
                  </span>
                  <span className="font-medium text-gray-700">
                    {order.items.reduce(
                      (sum, i) => sum + i.product.price * i.quantity,
                      0
                    )}{" "}
                    บาท
                  </span>
                </div>

                {/* Items */}
                <div className="mt-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                    >
                      {/* รูปสินค้า */}
                      <Image
                        src={
                          item.product.images?.find((img) => img.isMain)?.url ||
                          item.product.images?.[0]?.url ||
                          "/no-image.png" // fallback ถ้าไม่มีรูป
                        }
                        alt={item.product.title}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />

                      {/* ชื่อสินค้า + จำนวน */}
                      <div className="flex-1">
                        <span className="block font-medium text-gray-800 truncate">
                          {item.product.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          x {item.quantity}
                        </span>
                      </div>

                      {/* ราคาต่อชิ้น */}
                      <span className="text-sm font-semibold text-gray-700">
                        {item.product.price} บาท
                      </span>
                    </div>
                  ))}
                </div>

                <div></div>
              </div>
            ))}
          </div>
        </CardTitle>
      </CardContent>
    </Card>
  );
}
