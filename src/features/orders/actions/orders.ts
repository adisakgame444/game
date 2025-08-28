"use server";

import { redirect } from "next/navigation";
import {
  cancelOrderStatus,
  createOrder,
  updateOrderStatus,
  uploadPaymentSlip,
} from "../db/orders";
import { InitialFormState } from "@/types/action";
import { confirmPayment } from "../db/orders";

export const checkoutAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const paymentMethod = formData.get("paymentMethod") as string;
  const data = {
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
    note: formData.get("note") as string,
    useProfileData: formData.get("use-profile-data") as string,
    paymentMethod,
  };
  const result = await createOrder(data, paymentMethod);

  if (result && result.message && !result.orderId) {
    return {
      success: false,
      message: result.message,
      errors: result.error,
    };
  }

  redirect(`/my-orders/${result.orderId}`);
};

export const updatePaymentAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const orderId = formData.get("order-id") as string;
  const paymentImage = formData.get("payment-image") as File;

  // 1) อัปโหลดสลิป
  const result = await uploadPaymentSlip(orderId, paymentImage);

  if (result && result.message) {
    return {
      success: false,
      message: result.message,
    };
  }

  // 2) ถ้าอัปโหลดสำเร็จ → ยืนยันการชำระเงิน + ลด stock
  await confirmPayment(orderId);

  return {
    success: true,
    message: "อัปโหลดหลักฐานการชำระเงินสำเร็จ และอัพเดทสต็อกแล้ว",
  };
};

export const cancelOrderStatusAction = async (
  _prevState: InitialFormState,
  formData: FormData
) => {
  const orderId = formData.get("order-id") as string;

  const result = await cancelOrderStatus(orderId);

  return result && result.message
    ? {
        success: false,
        message: result.message,
      }
    : {
        success: true,
        message: "ยกเลิกคำสั่งซื้อสำเร็จ",
      };
};

export const updateOrderStatusAction = async (formData: FormData) => {
  const data = {
    orderId: formData.get("order-id") as string,
    status: formData.get("status") as string,
    trackingNumber: formData.get("tracking-number") as string,
  };

  const result = await updateOrderStatus(data);

  return result && result.message
    ? {
        success: false,
        message: result.message,
      }
    : {
        success: true,
        message: "อัพเดตสถานะคำสั่งซื้อสำเร็จ",
      };
};
