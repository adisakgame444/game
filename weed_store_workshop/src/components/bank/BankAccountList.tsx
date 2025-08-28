"use client";

import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";

interface BankAccount {
  id: string;
  bankName: string;
  accountNo: string;
  accountName: string;
}

export default function BankAccountList({
  banks,
  onDelete, // 👈 เพิ่ม prop สำหรับลบ
}: {
  banks: BankAccount[];
  onDelete?: (id: string) => void;
}) {
  if (!banks.length) {
    return <p className="text-gray-500">ยังไม่มีบัญชีธนาคาร</p>;
  }

  return (
    <div className="space-y-3">
      {banks.map((bank) => (
        <Card
          key={bank.id}
          className="p-3 border shadow-sm hover:shadow-md transition rounded-lg"
        >
          <div className="flex items-center justify-between">
            {/* ข้อมูลบัญชีฝั่งซ้าย */}
            <div>
              <p className="font-medium text-gray-800">{bank.bankName}</p>
              <p className="text-sm text-gray-600">{bank.accountNo}</p>
              <p className="text-sm text-gray-600">{bank.accountName}</p>
            </div>

            {/* ปุ่มลบฝั่งขวา */}
            <Button
              onClick={() => onDelete?.(bank.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-lg"
            >
              ลบ
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
