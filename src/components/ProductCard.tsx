"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
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
  rating?: number;
  reviewCount?: number;
}

export function ProductCard({
  id, name, slug, price, salePrice, image, categoryName, categorySlug, rating = 4.5, reviewCount = 0
}: ProductCardProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem({ id, name, price, salePrice, image, slug });
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 600);
  };

  const hasDiscount = salePrice !== null && salePrice < price;
  const discountPercent = hasDiscount ? Math.round((1 - salePrice! / price) * 100) : 0;

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge variant="danger">-{discountPercent}%</Badge>
            </div>
          )}
          {rating >= 4.5 && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-stone-700 shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {rating}
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">{categoryName}</p>
          <h3 className="font-medium text-stone-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-rose-600">{formatPrice(salePrice!)}</span>
                  <span className="text-xs text-stone-400 line-through">{formatPrice(price)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-stone-900">{formatPrice(price)}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={adding}
              className={`p-2 rounded-xl transition-all duration-200 ${
                adding
                  ? "bg-emerald-500 text-white scale-110"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-900 hover:text-white"
              }`}
              aria-label="Add to cart"
            >
              <ShoppingCart className={`w-4 h-4 ${adding ? "animate-bounce" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
