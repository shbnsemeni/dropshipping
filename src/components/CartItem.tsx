"use client";

import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const unitPrice = item.salePrice ?? item.price;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
      <Link href={`/products/${item.slug}`} className="shrink-0">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.slug}`} className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
          {item.name}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">{formatPrice(unitPrice)} each</p>
        <p className="text-sm font-medium text-gray-900 mt-1">{formatPrice(unitPrice * item.quantity)}</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100 rounded-full">
          <Minus className="w-4 h-4 text-gray-500" />
        </button>
        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100 rounded-full">
          <Plus className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-50 rounded-full group">
        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
      </button>
    </div>
  );
}
