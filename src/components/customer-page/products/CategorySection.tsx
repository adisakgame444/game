
"use client";

import { useState } from "react";
import CategorySelect from "./CategorySelect";
import CategoryModal from "./CategoryModal";
import { ProductType } from "@/types/product";

interface CategoryMini {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryMini[];
  products: ProductType[];
}

export default function CategorySection({ categories, products }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const filtered = selectedId
    ? products.filter((p) => p.categoryId === selectedId)
    : [];

  const selectedName =
    categories.find((c) => c.id === selectedId)?.name || "หมวดหมู่";

  return (
    <section>
      {/* ปุ่มเลือกหมวดหมู่ */}
      <CategorySelect
        categories={categories}
        value={selectedId}
        onChange={(id) => {
          setSelectedId(id);
          if (id) setOpen(true); // เปิด modal เมื่อเลือกหมวดหมู่
        }}
      />

      {/* Modal สำหรับแสดงสินค้า */}
      <CategoryModal
        categoryName={selectedName}
        products={filtered}
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}
