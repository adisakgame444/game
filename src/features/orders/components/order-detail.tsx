"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { generatePromptPayQR } from "@/lib/generatePromptPayQR";
import { getStatusColor, getStatusText } from "@/lib/utils";
import { OrderType } from "@/types/order";
import { Ban, CreditCard, Download, Upload } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import PaymentFormModal from "./payment-form-modal";
import CancelOrderModal from "./cancel-order-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BankAccount } from "@/types/bank";

interface OrderDetailProps {
  order: OrderType;
  paymentMethod: string | null;
  banks: BankAccount[];
}

const OrderDetail = ({ order, paymentMethod, banks }: OrderDetailProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    paymentMethod ?? ""
  );
  const hasNoCOD = order.items.some((item) => item.product.cod === false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banks.length);
    }, 300000); // 300,000 ms = 5 นาที

    return () => clearInterval(interval);
  }, [banks.length]);

  const currentBank = banks[currentIndex];

  // const [isDisabled, setIsDisabled] = useState(false);
  // useEffect(() => {
  //   // ถ้ามี flag อยู่แล้ว แสดงว่าลูกค้าเคยเปิดหน้านี้มาก่อน → disable select
  //   const alreadyVisited = sessionStorage.getItem("visited_order_page");
  //   if (alreadyVisited) {
  //     setIsDisabled(true);
  //   } else {
  //     // ถ้าเพิ่งเข้าเป็นครั้งแรก → ตั้งค่า flag
  //     sessionStorage.setItem("visited_order_page", "true");
  //   }
  // }, []);

  const [isGeneratingQR, setIsGenerateingQR] = useState(false);
  const [isPaymentFormModal, setIsPaymentFormModal] = useState(false);
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [qrPaymentURL, setQrPaymentURL] = useState<string | null>(null);
  const [qrCODURL, setQrCODURL] = useState<string | null>(null);

  const handleGenerateQR = async () => {
    try {
      setIsGenerateingQR(true);
      // เอาเฉพาะยอดสินค้า ไม่รวมค่าจัดส่ง
      const productAmount = (order.totalAmount || 0) - (order.shippingFee || 0);

      // ยอด COD = ยอดสินค้า + ค่าธรรมเนียม COD 100
      const amountForCOD = (productAmount || 0) + 100;
      const qrCODPayment = await generatePromptPayQR(amountForCOD);

      // ยอดโอนปกติ = ยอดสินค้า (ไม่รวมค่าจัดส่ง)
      const amountForPayment = (productAmount || 0) + 50;
      const qrFullPayment = await generatePromptPayQR(amountForPayment);

      setQrPaymentURL(qrCODPayment); // อันแรก
      setQrCODURL(qrFullPayment); // อันที่สอง
    } catch (error) {
      console.error(error);
      toast.error("ไม่สามารถสร้างคิวอาร์โค้ดได้");
    } finally {
      setIsGenerateingQR(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex justify-between items-center w-full">
              <span>หมายเลขคำสั่งซื้อ:</span>
              <span>{order.orderNumber}</span>
            </CardTitle>
            <Badge className={`mb-2 ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </Badge>
          </CardHeader>

          <CardContent className="p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สินค้า</TableHead>
                  <TableHead className="text-right">ราคาต่อชิ้น</TableHead>
                  <TableHead className="text-center">จำนวน</TableHead>
                  <TableHead className="text-right">ราคารวม</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative size-10 border rounded-md overflow-hidden">
                          <Image
                            alt={item.productTitle}
                            src={
                              item.productImage ||
                              "/images/no-product-image.webp"
                            }
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{item.productTitle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.totalPirce)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">ข้อมูลการจัดส่ง</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-1">ที่อยู่จัดส่ง:</h3>
                <p className="text-muted-foreground">{order.address || "-"}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">เบอร์โทรศัพท์:</h3>
                <p className="text-muted-foreground">{order.phone || "-"}</p>
              </div>

              {order.note && (
                <div>
                  <h3 className="font-medium mb-1">หมายเหตุ:</h3>
                  <p className="text-muted-foreground">{order.note}</p>
                </div>
              )}

              {order.trackingNumber && (
                <div>
                  <h3 className="font-medium mb-1">หมายเลขพัสดุ:</h3>
                  <p className="text-medium text-primary">
                    {order.trackingNumber}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">สรุปคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ยอดสินค้า:</span>
                <span>
                  {formatPrice(order.totalAmount - order.shippingFee)}
                </span>
              </div>
              {selectedPaymentMethod !== "cod" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ค่าจัดส่ง:</span>
                  <span>{formatPrice(order.shippingFee)}</span>
                </div>
              )}

              {selectedPaymentMethod === "cod" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    ค่าธรรมเนียม COD:
                  </span>
                  <span>{formatPrice(100)}</span>
                </div>
              )}

              <Separator />
            </div>
            <div>
              <div className="flex justify-between font-bold">
                <span>ยอดรวมทั้งสิ้น:</span>
                <span>
                  {formatPrice(
                    selectedPaymentMethod === "cod"
                      ? order.totalAmount - order.shippingFee + 100 // ตัดค่าจัดส่งออก แล้วบวก 100
                      : order.totalAmount // ใช้ยอดปกติรวมค่าจัดส่ง
                  )}
                </span>
              </div>
              <Select
                value={selectedPaymentMethod}
                onValueChange={(value) => setSelectedPaymentMethod(value)}
                disabled={
                  order.status === "Paid" ||
                  order.status === "Cancelled" ||
                  !qrPaymentURL ||
                  !qrCODURL
                }
              >
                <SelectTrigger className="w-full rounded-lg border border-gray-300">
                  <SelectValue placeholder="-- เลือกวิธีชำระเงิน --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">💳 โอนชำระ</SelectItem>
                  {!hasNoCOD && (
                    <SelectItem value="cod">📦 เก็บเงินปลายทาง</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {order.status === "Pending" && (
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-2">
                  {qrCODURL ? (
                    <div className="rounded-md border p-4 flex flex-col items-center">
                      <h3 className="text-center font-medium mb-3">
                        สแกน QR Code เพื่อชำระเงิน
                      </h3>

                      {selectedPaymentMethod === "transfer" && qrCODURL && (
                        <div className="mb-3">
                          <Image
                            alt="PromptPay QR Code"
                            src={qrCODURL}
                            width={200}
                            height={200}
                          />
                        </div>
                      )}

                      {selectedPaymentMethod === "cod" && qrPaymentURL && (
                        <div className="mb-3">
                          <Image
                            alt="PromptPay QR Payment"
                            src={qrPaymentURL}
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
                      {selectedPaymentMethod && (
                        <a
                          href={
                            selectedPaymentMethod === "transfer"
                              ? qrPaymentURL || "#"
                              : qrCODURL || "#"
                          }
                          download="promptpay_qrcode.png"
                          className="flex items-center justify-center gap-2 p-2"
                          onClick={(e) => {
                            const qrURL =
                              selectedPaymentMethod === "cod"
                                ? qrCODURL
                                : qrPaymentURL;

                            if (!qrURL) {
                              e.preventDefault();
                              alert("ไม่มี QR CODE ให้บันทึก");
                            }
                          }}
                        >
                          <Download size={16} />
                          บันทึกรูปภาพ QR CODE
                        </a>
                      )}

                      {selectedPaymentMethod && (
                        <div className="p-4 bg-white rounded shadow-md">
                          <h2 className="text-lg font-semibold mb-2 text-center">
                            บัญชีธนาคาร
                          </h2>
                          {currentBank ? (
                            <div className="border p-3 rounded-lg text-center">
                              <p className="font-medium">
                                {currentBank.bankName}
                              </p>
                              <p>เลขบัญชี: {currentBank.accountNo}</p>
                              <p>ชื่อบัญชี: {currentBank.accountName}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500">ไม่มีบัญชีธนาคาร</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={handleGenerateQR}
                      disabled={isGeneratingQR}
                    >
                      <CreditCard />
                      <span>
                        {isGeneratingQR
                          ? "กำลังสร้าง QR Code..."
                          : "ชำระเงินด้วย PromptPay"}
                      </span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => setIsPaymentFormModal(true)}
                  >
                    <Upload size={16} />
                    <span>อัพโหลดหลักฐานการชำระเงิน</span>
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => setIsCancelModal(true)}
                  >
                    <Ban size={16} />
                    <span>ยกเลิกคำสั่งซื้อ</span>
                  </Button>
                </div>

                <PaymentFormModal
                  open={isPaymentFormModal}
                  onOpenChange={setIsPaymentFormModal}
                  orderId={order.id}
                />

                <CancelOrderModal
                  open={isCancelModal}
                  onOpenChange={setIsCancelModal}
                  orderId={order.id}
                />
              </div>
            )}

            {order.paymentImage && (
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="font-medium">หลักฐานการชำระเงิน:</h3>
                <div className="relative aspect-square w-full rounded-md overflow-hidden border">
                  <Image
                    alt="Payment proof"
                    src={order.paymentImage}
                    fill
                    className="object-contain"
                  />
                </div>
                {order.paymentAt && (
                  <p className="text-sm text-muted-foreground">
                    ชำระเงินเมื่อ: {order.paymentAtFormatted}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
