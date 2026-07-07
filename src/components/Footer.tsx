import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              JSitema<span className="text-blue-400">U</span>ang
            </h3>
            <p className="text-sm text-gray-400">
              Your one-stop shop for quality products at unbeatable prices. Fast shipping worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=home-kitchen" className="hover:text-white transition-colors">Home & Kitchen</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><span className="text-gray-500">Shipping Info</span></li>
              <li><span className="text-gray-500">Returns</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@jsitemuang.xyz</li>
              <li>Mon-Fri 9AM-6PM EST</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} JSitemaUang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
