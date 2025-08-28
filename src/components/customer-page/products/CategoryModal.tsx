"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ProductCard from "./product-card";
import { ProductType } from "@/types/product";

interface Props {
  categoryName: string;
  products: ProductType[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CategoryModal({
  categoryName,
  products,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[700px] w-[95%] max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>{categoryName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 flex-1">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-gray-500">ไม่มีสินค้าภายในหมวดหมู่นี้</p>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <button className="px-4 py-2 rounded-md bg-gray-200">ปิด</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
