import React from 'react';
import { FaFacebook } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">ติดต่อเรา</h1>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold">อีเมล</h2>
            <p>contact@yourdomain.com</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">เบอร์โทร</h2>
            <p>089-123-4567</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">ที่อยู่</h2>
            <p>123 ถนนสุขุมวิท แขวงคลองเตย เขตวัฒนา กรุงเทพฯ 10110</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://www.facebook.com/yourfacebookpage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <FaFacebook size={20} />
            เยี่ยมชม Facebook ของเรา
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;