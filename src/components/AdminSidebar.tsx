"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Tags, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/categories", label: "Categories", icon: Tags },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-stone-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-stone-800">
        <Link href="/admin" className="text-lg font-bold tracking-tight">
          JS<span className="text-rose-400">U</span> Admin
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive ? "bg-rose-500 text-white shadow-sm" : "text-stone-400 hover:text-white hover:bg-stone-800"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-stone-800 space-y-1">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800 w-full transition-colors">
          View Store
        </Link>
      </div>
    </aside>
  );
}
