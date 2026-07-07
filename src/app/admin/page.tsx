import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [totalOrders, totalRevenue, totalProducts, pendingOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.product.count(),
    prisma.order.count({ where: { status: "paid" } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return { totalOrders, totalRevenue: totalRevenue._sum.total || 0, totalProducts, pendingOrders, recentOrders };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "bg-rose-500" },
    { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-emerald-500" },
    { title: "Products", value: stats.totalProducts, icon: Package, color: "bg-violet-500" },
    { title: "Pending", value: stats.pendingOrders, icon: TrendingUp, color: "bg-amber-500" },
  ];

  const statusColors: Record<string, string> = {
    paid: "bg-blue-100 text-blue-800",
    processing: "bg-amber-100 text-amber-800",
    shipped: "bg-violet-100 text-violet-800",
    delivered: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-stone-200 p-6">
            <div className={`${card.color} p-3 rounded-xl w-fit mb-4`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500">{card.title}</p>
            <p className="text-2xl font-bold text-stone-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-200">
        <div className="px-6 py-4 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-stone-500">
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Items</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="text-sm text-stone-900">
                  <td className="px-6 py-4">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-stone-500 text-xs">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">{order.items.length} items</td>
                  <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status] || "bg-stone-100 text-stone-800"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-stone-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
