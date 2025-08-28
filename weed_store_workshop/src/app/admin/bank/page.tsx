import { createBankAccount } from "@/features/bank/actions";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BankAccountList from "@/components/bank/BankAccountList";
import { deleteBankAccount } from "@/features/bank/actions";

export default async function BankAdminPage() {
  const banks = await db.bankAccount.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-3">บัญชีธนาคาร</h1>

      {/* Layout responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* ฟอร์มเพิ่มบัญชี */}
        <Card className="shadow-lg border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg">เพิ่มบัญชีธนาคาร</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createBankAccount} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">ชื่อธนาคาร</label>
                <Input
                  type="text"
                  name="bankName"
                  required
                  placeholder="กรอกชื่อธนาคาร"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">เลขที่บัญชี</label>
                <Input
                  type="text"
                  name="accountNo"
                  required
                  placeholder="กรอกเลขที่บัญชี"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">ชื่อบัญชี</label>
                <Input
                  type="text"
                  name="accountName"
                  required
                  placeholder="กรอกชื่อบัญชี"
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <Button type="submit" className="w-full rounded-xl">
                บันทึกข้อมูล
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* รายการบัญชีธนาคาร */}
        <Card className="shadow-lg border rounded-2xl h-full">
          <CardHeader>
            <CardTitle className="text-lg">รายการบัญชีธนาคาร</CardTitle>
          </CardHeader>
          <CardContent>
            <BankAccountList banks={banks} onDelete={deleteBankAccount} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
