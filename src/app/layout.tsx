import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Kanit } from "next/font/google";


export const metadata: Metadata = {
  title: {
    default: "TK-Store",
    template: "%s",
  },
  description:
    "ร้านค้าออนไลน์สายเขียว พร้อมบริการจัดส่งเร็วและราคาที่คุ้มค่า!",
};

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={kanit.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
