"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/Button";
import Link from "next/link";

const SHIPPING = 4.99;
const FREE_SHIPPING_MIN = 50;

export function CartSummary() {
  const { subtotal, itemCount } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_MIN - subtotal);

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

      {freeShippingRemaining > 0 && subtotal > 0 && (
        <div className="bg-blue-50 text-blue-700 text-xs px-3 py-2 rounded-lg">
          Add {formatPrice(freeShippingRemaining)} more for free shipping
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(shipping)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/products" className="block text-center text-sm text-blue-600 hover:text-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
}
