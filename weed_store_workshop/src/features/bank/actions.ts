"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBankAccount(formData: FormData) {
  const bankName = formData.get("bankName") as string;
  const accountNo = formData.get("accountNo") as string;
  const accountName = formData.get("accountName") as string;

  if (!bankName || !accountNo) {
    throw new Error("ข้อมูลไม่ครบถ้วน");
  }

  await db.bankAccount.create({
    data: {
      bankName,
      accountNo,
      accountName,
    },
  });

  // refresh หน้า admin/bank หลังบันทึก
  revalidatePath("/admin/bank");
}

export async function deleteBankAccount(id: string) {
  try {
    await db.bankAccount.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "ไม่สามารถลบได้" };
  }
}
