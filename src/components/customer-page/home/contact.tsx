import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';

const ContactFooter = () => {
  return (
    <div className="w-full bg-gray-100 py-2">
      <div className="w-full px-2">
        <Card className="w-full rounded-[8px] shadow-none border-t border-gray-300">
          <CardContent className="p-1 md:p-2 lg:p-3 text-center">
            <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1">
              ติดต่อเราได้ที่นี่
            </h2>

            <div className="flex justify-center gap-2 flex-wrap mb-2 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>contact@yourdomain.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>089-123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>กรุงเทพมหานคร, ประเทศไทย</span>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.facebook.com/tk.flowers.464538"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
               >
                <Facebook className="w-4 h-4" />
                เยี่ยมชม Facebook ของเรา
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactFooter;