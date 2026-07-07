"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User, Heart, LogOut, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const { itemCount } = useCart();
  const { customer, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Sports", slug: "sports-outdoors" },
    { name: "Beauty", slug: "beauty-health" },
  ];

  const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-stone-900">JSitema</span>
              <span className="text-rose-500">U</span>
              <span className="text-stone-900">ang</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/" ? "bg-stone-100 text-stone-900" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith("/products") ? "bg-stone-100 text-stone-900" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${cat.slug}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname.includes(cat.slug) ? "bg-stone-100 text-stone-900" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-stone-600" />
            </button>

            <Link
              href="/cart"
              className="relative p-2.5 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-stone-600" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-sm">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {customer ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2.5 hover:bg-stone-100 rounded-xl transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5 text-stone-600" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 animate-scale-in origin-top-right">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-sm font-medium text-stone-900 truncate">{customer.name}</p>
                      <p className="text-xs text-stone-500 truncate">{customer.email}</p>
                    </div>
                    <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors">
                      <User className="w-4 h-4" /> My Account
                    </Link>
                    <Link href="/account/orders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors">
                      <Package className="w-4 h-4" /> My Orders
                    </Link>
                    <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors w-full">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-stone-600" /> : <Menu className="w-5 h-5 text-stone-600" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-stone-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(e); } }}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none text-sm transition-all"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-xl transition-colors">
              Home
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-xl transition-colors">
              All Products
            </Link>
            <div className="border-t border-stone-100 my-2" />
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 rounded-xl transition-colors">
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-stone-100 my-2" />
            {!customer && (
              <Link href="/account/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                Sign In / Register
              </Link>
            )}
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 rounded-xl transition-colors">
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 rounded-xl transition-colors">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
