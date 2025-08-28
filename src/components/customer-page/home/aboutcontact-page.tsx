import { FileText, Info, PhoneCall, ShieldCheck } from "lucide-react";
import React from "react";

const AboutContactPage = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Section 1: Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
            เกี่ยวกับเรา
          </h1>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            <span className="font-semibold text-green-700">DOAG THAI</span>{" "}
            เป็นร้านจำหน่ายสินค้าในรูปแบบ{" "}
            <span className="font-medium text-gray-800">Digital Product</span>{" "}
            ที่มุ่งเน้นความสะดวก รวดเร็ว คุ้มค่า และปลอดภัย
            เพื่อให้ลูกค้าทุกท่านมั่นใจได้ในทุกการสั่งซื้อ
          </p>
        </section>

        {/* Section 2: ข้อควรรู้ */}
        <section className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Info className="text-red-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-red-600">
              ก่อนการสั่งซื้อสินค้า
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            โปรดอ่านข้อควรระวังและเงื่อนไขการใช้งานก่อนการสั่งซื้อสินค้า
            เพื่อความเข้าใจที่ตรงกัน และป้องกันปัญหาที่อาจเกิดขึ้นภายหลัง
          </p>
        </section>

        {/* Section 3: เงื่อนไขการซื้อสินค้า */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600 w-7 h-7" />
            <h2 className="text-3xl font-bold text-gray-800">
              เงื่อนไขการซื้อสินค้า
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700 list-disc pl-6 leading-relaxed">
            <li>
              ร้าน DOAG THAI เปิดให้บริการทุกวัน ตั้งแต่เวลา 09.00น. - 00.00น.
            </li>
            <li>
              ผู้ซื้อควรตรวจสอบรายละเอียดของสินค้าให้ครบถ้วนก่อนทำการชำระเงิน
            </li>
            <li>
              การชำระเงินทั้งหมดไม่สามารถคืนได้ กรุณาตรวจสอบให้แน่ใจก่อนซื้อ
            </li>
            <li>การชำระเงินมีให้เลือกสองแบบ QR CODE และ บัญชีธนาคาร</li>
            <li>ลูกค้าที่สั่งจำนวนมาก แนะนำให้โอนทางบัญชีธนาคาร</li>
            <li>หากพบปัญหาในการใช้งาน ติดต่อทีมงานผ่าน Facebook หรือ Line</li>
          </ul>
        </section>

        {/* Section 4: เงื่อนไขการฝากขาย */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="text-emerald-600 w-7 h-7" />
            <h2 className="text-3xl font-bold text-gray-800">
              เงื่อนไขการฝากขายสินค้า
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700 list-decimal pl-6 leading-relaxed">
            <li>
              ร้าน DOAG THAI เปิดให้บริการทุกวัน ตั้งแต่เวลา 09.00น. - 22.00น.
            </li>
            <li> ผู้ขายสามารถฝากขายสินค้าที่เกี่ยวกับกัญชาได้ทุกประเภท</li>
            <li>
              การฝากขายสินค้าจะเป็นการเช่าบล็อกแสงรูปสินค้าและรายละเอียดของสินค้า
              (มีค่าใช้จ่าย)
            </li>
            <li>
              บล็อกของสินค้าไม่มีขั้นต่ำในการเช่า 1
              บล็อกก็สามารถเช่าขายสินค้าได้เลย
            </li>
            <li>
              ถ้าสินค้าหมดก่อนในระหว่างการเช่า ผู้ขายสามารถแจ้งแอดมินที่เพจ
              Facebook
              สามารถส่งรูปสินค้าตัวใหม่ให้แอดมินลงขายได้เลยไม่ต้องเสียค่าเช่าซ้ำซ้อน
              จนกว่าจะครบกำหนด
            </li>
            <li>
              ค่าเช่าบล็อกแสดงสินค้าของผู้ขายจะขึ้นอยุ่กับ ขนาดของสินค้าที่ลงขาย
            </li>
            <li>การขายสินค้าในเว็บผู้ขายต้องแจ้งลายละเอียดสินค้าให้ครบ</li>
            <li>
              เมื่อเช่าบล็อกสินค้าแล้วผู้ขายจะต้องขายสินค้าให้ครบตามกำหนดในการเช่า
            </li>
            <li>สินค้าของผู้ขายต้องมีคุณภาพ มาตรฐาน ไม่เป็นอัตรายต่อผู้ใช้</li>
            <li>บล็อกสินค้า 1 บล็อก ต่อ สินค้า 1 รายการ</li>
            <li>ผู้ขายสามารถเช่า แบนเนอร์ - Banner โปรโมทสินค้าของตัวเองได้</li>
            <li>
              สินค้ารายการไหนของผู้ขาย หรือ ร้านนั้น มียอดขายเกิน 50-100
              ออเดอร์ต่อเดือน
              ผู้ขายต้องชำระค่ารูปแนะนำสินค้าเพื่อเป็นการโปรโมทสินค้าของท่านเอง
            </li>
          </ul>
        </section>

        {/* Section 5: ติดต่อ */}
        <section className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <PhoneCall className="text-blue-600 w-6 h-6" />
            <h2 className="text-3xl font-bold text-gray-800">ติดต่อเรา</h2>
          </div>
          <div className="space-y-2 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">Facebook:</span> Termtang Official
            </p>
            <p>
              <span className="font-semibold">Line:</span> @Termtang
            </p>
            <p>
              <span className="font-semibold">เวลาทำการ:</span> 10.00น. -
              22.00น.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AboutContactPage;
