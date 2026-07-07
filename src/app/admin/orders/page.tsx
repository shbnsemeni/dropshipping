"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  items: { id: string }[];
  createdAt: string;
}

const statusColors: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  paid: "info",
  processing: "warning",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${statusFilter}`);
      const data = await res.json();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success(`Order marked as ${status}`);
        fetchOrders();
      }
    } catch {
      toast.error("Failed to update order");
    }
  }

  const statuses = ["all", "paid", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              statusFilter === s ? "bg-stone-900 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-stone-500 bg-stone-50">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Items</th>
              <th className="px-6 py-3 font-medium">Total</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map((order) => (
              <tr key={order.id} className="text-sm text-stone-900 hover:bg-stone-50">
                <td className="px-6 py-4">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-stone-500 text-xs">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4">{order.items.length} items</td>
                <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <Badge variant={statusColors[order.status] || "default"}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-stone-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    {order.status === "paid" && (
                      <Button variant="secondary" size="sm" onClick={() => updateStatus(order.id, "processing")}>
                        Process
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button variant="secondary" size="sm" onClick={() => updateStatus(order.id, "shipped")}>
                        Ship
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="secondary" size="sm" onClick={() => updateStatus(order.id, "delivered")}>
                        Deliver
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
