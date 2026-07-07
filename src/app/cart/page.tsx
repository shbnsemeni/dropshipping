"use client";

import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { CartSummary } from "@/components/CartSummary";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-stone-400" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">Your Cart is Empty</h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t added anything yet. Browse our products and find something you love.</p>
        <Link href="/products">
          <Button size="lg">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
            Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-4 md:p-6">
              <CartItem item={item} />
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
