'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import type { ProductType } from '@/types/product';

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
    <div className=" space-y-3">
      <input
        type="text"
        placeholder=" ค้นหาสินค้า..."
        className="w-full sm:w-72 p-1 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-green-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p className="text-gray-500">ไม่พบสินค้า</p>
        )}
      </div>
    </div>
  );
}
