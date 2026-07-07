"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  categoryName: string;
  categorySlug: string;
}

export function ProductCard({ id, name, slug, price, salePrice, image, categoryName, categorySlug }: ProductCardProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem({ id, name, price, salePrice, image, slug });
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 500);
  };

  const hasDiscount = salePrice !== null && salePrice < price;
  const discountPercent = hasDiscount ? Math.round((1 - salePrice! / price) * 100) : 0;

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2">
              <Badge variant="danger">-{discountPercent}%</Badge>
            </div>
          )}
          <button
            onClick={handleAdd}
            disabled={adding}
            className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all duration-200"
          >
            <ShoppingCart className={`w-4 h-4 text-gray-700 ${adding ? "animate-bounce" : ""}`} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{categoryName}</p>
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-blue-600">{formatPrice(salePrice!)}</span>
                <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
