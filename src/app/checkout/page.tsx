"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerName || !form.customerEmail || !form.address || !form.city || !form.state || !form.zip) {
      toast.error("Please fill in all fields");
      return;
    }

    if (itemCount === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            salePrice: i.salePrice,
            image: i.image,
            quantity: i.quantity,
          })),
          ...form,
        }),
      });

      const data = await res.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to connect to payment server");
    } finally {
      setLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>

              <Input label="Full Name" name="customerName" value={form.customerName} onChange={handleChange} placeholder="John Doe" required />
              <Input label="Email" name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} placeholder="john@example.com" required />
              <Input label="Address" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Apt 4B" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" name="city" value={form.city} onChange={handleChange} required />
                <Input label="State" name="state" value={form.state} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="ZIP Code" name="zip" value={form.zip} onChange={handleChange} required />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to Stripe&apos;s secure checkout page to complete your payment.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock className="w-3 h-3" />
                Payments are encrypted and processed securely by Stripe
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg" loading={loading}>
              {loading ? "Redirecting to Stripe..." : `Pay ${formatPrice(subtotal + (subtotal >= 50 ? 0 : 4.99))}`}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{item.name}</p>
                    <p className="text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{subtotal >= 50 ? "FREE" : "$4.99"}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-base pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(subtotal + (subtotal >= 50 ? 0 : 4.99))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
