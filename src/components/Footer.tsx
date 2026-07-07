import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-white">JSitema</span>
              <span className="text-rose-400">U</span>
              <span className="text-white">ang</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              Your premier destination for quality products at unbeatable prices. Curated with care, shipped worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-stone-800 hover:bg-rose-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs text-stone-400 hover:text-white uppercase font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=home-kitchen" className="hover:text-white transition-colors">Home & Kitchen</Link></li>
              <li><Link href="/products?category=sports-outdoors" className="hover:text-white transition-colors">Sports & Outdoors</Link></li>
              <li><Link href="/products?category=beauty-health" className="hover:text-white transition-colors">Beauty & Health</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><span className="text-stone-600 cursor-default">Shipping Information</span></li>
              <li><span className="text-stone-600 cursor-default">Returns & Exchanges</span></li>
              <li><span className="text-stone-600 cursor-default">FAQ</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-stone-600 mt-0.5">✉</span>
                <span>support@jsitemuang.xyz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-600 mt-0.5">⏰</span>
                <span>Mon – Fri: 9AM – 6PM EST</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-600 mt-0.5">📍</span>
                <span>Worldwide Shipping</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-stone-500 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 outline-none"
                />
                <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-stone-600">
            &copy; {year} JSitemaUang. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-stone-600 cursor-default hover:text-stone-500 transition-colors">Privacy Policy</span>
            <span className="text-stone-600 cursor-default hover:text-stone-500 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
