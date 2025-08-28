// export const generatePromptPayQR = (amount: number) => {
//   try {
//     const promptpayId = process.env.NEXT_PUBLIC_PROMPTPAY_ID;

//     const formattedAmount = amount.toFixed(2);

//     const qrcodeDataUrl = `https://promptpay.io/${promptpayId}/${formattedAmount}`;

//     return qrcodeDataUrl;
//   } catch (error) {
//     console.error("Error generating PromptPay QR:", error);
//     throw new Error("ไม่สามารถสร้าง QR Code ได้");
//   }
// };

import QRCode from "qrcode";

export const generatePromptPayQR = async (amount: number) => {
  try {
    const promptpayId = process.env.NEXT_PUBLIC_PROMPTPAY_ID;
    const formattedAmount = amount.toFixed(2);

    // สร้าง string ข้อความสำหรับ QR code
    const qrText = `https://promptpay.io/${promptpayId}/${formattedAmount}`;

    // สร้าง Data URL PNG
    const qrCodeDataURL = await QRCode.toDataURL(qrText);

    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating PromptPay QR:", error);
    throw new Error("ไม่สามารถสร้าง QR Code ได้");
  }
};
