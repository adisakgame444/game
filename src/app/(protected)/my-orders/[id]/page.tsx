
import { Button } from "@/components/ui/button";
import { authCheck } from "@/features/auths/db/auths";
import OrderDetail from "@/features/orders/components/order-detail";
import { getOrderById } from "@/features/orders/db/orders";
import { ArrowLeft, PackageCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const user = await authCheck();
  if (!user) {
    redirect("/");
  }

  const { id } = await params;

  const order = await getOrderById(user.id, id);

  if (!order) {
    redirect("/my-orders");
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="flex items-center gap-2">
          <PackageCheck className="text-green-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">รายละเอียดคำสั่งซื้อ</h1>
        </div>

        <Button variant="outline" asChild className="gap-2 text-sm">
          <Link href="/cart">
            <ArrowLeft size={16} />
            <span>กลับไปหน้ารายการคำสั่งซื้อ</span>
          </Link>
        </Button>
      </div>

      <OrderDetail order={order} />
    </div>
  );
};

export default OrderDetailPage;