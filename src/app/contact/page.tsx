import Link from "next/link";
import { FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">ติดต่อเรา</h2>

        <div className="space-y-3 text-gray-600 text-left">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <span><span className="font-semibold">อีเมล:</span> contact@yourdomain.com</span>
          </p>

          <p className="flex items-center gap-2">
            <FaPhone className="text-green-500" />
            <span><span className="font-semibold">เบอร์โทร:</span> 089-123-4567</span>
          </p>

          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span><span className="font-semibold">ที่อยู่:</span> 123 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110</span>
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {/* ปุ่ม Facebook */}
          <a
            href="https://www.facebook.com/tk.flowers.464538"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <FaFacebook size={20} />
            เยี่ยมชม Facebook ของเรา
          </a>

          {/* ปุ่มกลับหน้าแรก */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            <FaArrowLeft size={16} />
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

