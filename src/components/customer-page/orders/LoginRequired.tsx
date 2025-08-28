"use client";

import { Lock } from "lucide-react";

export default function LoginRequired() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="p-6 rounded-xl border border-red-200 bg-red-50 text-center w-[90%] max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-red-500" />
          <h2 className="text-red-600 font-semibold text-lg">
            กรุณาเข้าสู่ระบบ
          </h2>
        </div>
        <p className="text-[15px] text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
          ต้องเข้าสู่ระบบถึงจะสามารถดูคำสั่งซื้อของคุณได้
        </p>

        <button className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow">
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
