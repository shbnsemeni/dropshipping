"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Lock, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount, clearCart } = useCart();
  const { customer } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(customer?.name || "");
  const [customerEmail, setCustomerEmail] = useState(customer?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");

  const handleSubmit = async () => {
    if (!customerName || !customerEmail || !address || !city || !state || !zip) {
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
          customerName,
          customerEmail,
          address,
          city,
          state,
          zip,
          country,
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
        <h1 className="text-2xl font-bold text-stone-900 mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-rose-600 hover:text-rose-700 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-stone-500" />
              Shipping Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="John Doe" required />
              <Input label="Email" name="customerEmail" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="john@example.com" required />
            </div>
            <Input label="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Apt 4B" required />
            <div className="grid grid-cols-3 gap-4">
              <Input label="City" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
              <Input label="State" name="state" value={state} onChange={(e) => setState(e.target.value)} required />
              <Input label="ZIP Code" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2.5 border border-stone-300 rounded-xl shadow-sm focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none text-sm"
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

          <div className="bg-white rounded-2xl border border-stone-200 p-6 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-stone-500" />
              <h2 className="text-lg font-semibold text-stone-900">Payment</h2>
            </div>
            <p className="text-sm text-stone-500 mb-4">
              You will be redirected to Stripe&apos;s secure checkout to complete your payment.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Lock className="w-3 h-3" />
              Payments are encrypted and processed securely by Stripe
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full mt-6" size="lg" loading={loading}>
            {loading ? "Redirecting to Stripe..." : `Pay ${formatPrice(subtotal + (subtotal >= 50 ? 0 : 4.99))}`}
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-stone-50 rounded-2xl p-6 sticky top-24">
            <h3 className="font-semibold text-stone-900 mb-4">Order Summary</h3>
            <div className="space-y-4 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-900 truncate font-medium">{item.name}</p>
                    <p className="text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-stone-900">
                    {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{subtotal >= 50 ? <span className="text-emerald-600 font-medium">FREE</span> : formatPrice(4.99)}</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-900 text-base pt-2 border-t border-stone-200">
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
