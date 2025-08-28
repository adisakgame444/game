"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { FolderIcon } from "lucide-react";

interface CategoryMini {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryMini[];
  value: string;
  onChange: (id: string) => void;
}

export default function CategorySelect({ categories, value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="custom-select">
        <SelectValue placeholder="หมวดหมู่สินค้า" />
      </SelectTrigger>
      <SelectContent side="bottom" align="end" avoidCollisions={false}>
        {categories.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
