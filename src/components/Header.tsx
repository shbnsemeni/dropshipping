"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User, LogOut, Package, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Sports", slug: "sports-outdoors" },
  { name: "Beauty", slug: "beauty-health" },
];

export function Header() {
  const { itemCount } = useCart();
  const { customer, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-200/50"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight">
              <span className={scrolled ? "text-stone-900" : "text-white"}>JSitema</span>
              <span className="text-rose-500">U</span>
              <span className={scrolled ? "text-stone-900" : "text-white"}>ang</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive(link.href)
                      ? scrolled ? "bg-stone-100 text-stone-900" : "bg-white/10 text-white"
                      : scrolled
                        ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative group">
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  categories.some((c) => pathname.includes(c.slug))
                    ? scrolled ? "bg-stone-100 text-stone-900" : "bg-white/10 text-white"
                    : scrolled
                      ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                }`}>
                  Categories
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-xl transition-colors ${
                scrolled ? "hover:bg-stone-100 text-stone-600" : "hover:bg-white/10 text-white/80"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl transition-colors ${
                scrolled ? "hover:bg-stone-100 text-stone-600" : "hover:bg-white/10 text-white/80"
              }`}
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
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
                  className={`p-2.5 rounded-xl transition-colors ${
                    scrolled ? "hover:bg-stone-100 text-stone-600" : "hover:bg-white/10 text-white/80"
                  }`}
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 animate-scale-in origin-top-right">
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
                className={`hidden sm:inline-flex items-center px-5 py-2 text-sm font-medium rounded-xl transition-all ${
                  scrolled
                    ? "bg-stone-900 text-white hover:bg-stone-800"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                scrolled ? "hover:bg-stone-100 text-stone-600" : "hover:bg-white/10 text-white/80"
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className={`${scrolled ? "bg-white border-t border-stone-200" : "bg-stone-950/90 backdrop-blur-xl border-t border-white/10"}`}>
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${scrolled ? "text-stone-400" : "text-stone-500"}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(e); } }}
                placeholder="Search products..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none text-sm transition-all ${
                  scrolled
                    ? "bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    : "bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
                }`}
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className={`lg:hidden border-t max-h-[80vh] overflow-y-auto ${
          scrolled
            ? "bg-white border-stone-200"
            : "bg-stone-950/95 backdrop-blur-xl border-white/10"
        }`}>
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              scrolled ? "text-stone-700 hover:bg-stone-50" : "text-white/80 hover:bg-white/10"
            }`}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              scrolled ? "text-stone-700 hover:bg-stone-50" : "text-white/80 hover:bg-white/10"
            }`}>
              All Products
            </Link>
            <div className={`border-t my-2 ${scrolled ? "border-stone-100" : "border-white/10"}`} />
            <p className={`px-4 py-1 text-xs uppercase tracking-wider font-medium ${scrolled ? "text-stone-400" : "text-stone-500"}`}>
              Categories
            </p>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
                scrolled ? "text-stone-600 hover:bg-stone-50" : "text-white/70 hover:bg-white/10"
              }`}>
                {cat.name}
              </Link>
            ))}
            <div className={`border-t my-2 ${scrolled ? "border-stone-100" : "border-white/10"}`} />
            {!customer && (
              <Link href="/account/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50/10 rounded-xl transition-colors">
                Sign In / Register
              </Link>
            )}
            <Link href="/about" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
              scrolled ? "text-stone-600 hover:bg-stone-50" : "text-white/70 hover:bg-white/10"
            }`}>
              About Us
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
              scrolled ? "text-stone-600 hover:bg-stone-50" : "text-white/70 hover:bg-white/10"
            }`}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
