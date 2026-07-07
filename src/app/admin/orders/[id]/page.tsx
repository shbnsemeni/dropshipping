"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; images: string; slug: string };
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  total: number;
  status: string;
  stripeSessionId: string | null;
  items: OrderItem[];
  createdAt: string;
}

const statusColors: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  paid: "info",
  processing: "warning",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/orders?status=all`)
      .then((r) => r.json())
      .then((orders: Order[]) => {
        const found = orders.find((o: Order) => o.id === params.id);
        if (found) {
          setOrder(found);
        }
      })
      .catch(() => toast.error("Failed to load order"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="text-center py-12 text-stone-500">Loading...</div>;
  if (!order) return <div className="text-center py-12 text-stone-500">Order not found</div>;

  return (
    <div className="max-w-4xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Customer Details</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-stone-500">Name:</span> {order.customerName}</p>
            <p><span className="text-stone-500">Email:</span> {order.customerEmail}</p>
            <p><span className="text-stone-500">Address:</span> {order.address}</p>
            <p><span className="text-stone-500">City:</span> {order.city}, {order.state} {order.zip}</p>
            <p><span className="text-stone-500">Country:</span> {order.country}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Order Info</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-stone-500">Order ID:</span> <span className="font-mono">{order.id.slice(0, 12)}...</span></p>
            <p><span className="text-stone-500">Status:</span> <Badge variant={statusColors[order.status] || "default"}>{order.status}</Badge></p>
            <p><span className="text-stone-500">Total:</span> <span className="font-semibold">${order.total.toFixed(2)}</span></p>
            <p><span className="text-stone-500">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            {order.stripeSessionId && (
              <p><span className="text-stone-500">Stripe Session:</span> <span className="font-mono text-xs">{order.stripeSessionId}</span></p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 mt-6">
        <div className="px-6 py-4 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900">Order Items</h2>
        </div>
        <div className="divide-y divide-stone-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-6 py-4">
              <img
                src={JSON.parse(item.product.images)[0]}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="font-medium text-stone-900">{item.product.name}</p>
                <p className="text-sm text-stone-500">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <p className="font-medium text-stone-900">${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
