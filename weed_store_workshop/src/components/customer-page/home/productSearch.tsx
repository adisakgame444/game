'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import type { ProductType } from '@/types/product';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

type Props = {
  products: ProductType[];
};

export default function ProductSearch({ products }: Props) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      products.filter((p) =>
        p.title.toLowerCase().includes(term)
      )
    );
  }, [search, products]);

  return (
  <div className="space-y-3">
    {/* Search Input */}
    <div className="relative w-full lg:max-w-full sm:max-w-sm mx-auto">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full
          pl-10 pr-4 
          py-0.5 sm:py-1
          border border-gray-300 rounded-full text-base 
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
      />
    </div>

    {/* Search Result */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filtered.length > 0 ? (
        filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))
      ) : (
        <p className="text-gray-500">ไม่พบสินค้าที่ค้นหา</p>
      )}
    </div>
  </div>
);
}
