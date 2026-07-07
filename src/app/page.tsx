import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
  return products.map((p) => ({ ...p, images: JSON.parse(p.images) }));
}

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#e94560_0%,_transparent_60%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0f3460_0%,_transparent_50%)] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium rounded-full mb-6">
              New Arrivals Weekly
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-fade-in">
              Discover Quality{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-500">
                Products
              </span>
              <br />
              at Unbeatable Prices
            </h1>
            <p className="text-lg md:text-xl text-stone-400 max-w-xl mb-8 leading-relaxed animate-fade-in stagger-1">
              Shop from our curated collection of premium products. Fast worldwide shipping with easy returns and secure payments.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in stagger-2">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 active:scale-[0.98]"
              >
                Shop Now
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/products?category=electronics"
                className="inline-flex items-center px-8 py-3.5 bg-white/5 text-white font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10"
              >
                Browse Electronics
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fafaf9] to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16 md:mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-4">
                <h3 className="text-white font-semibold text-sm md:text-base">{cat.name}</h3>
                <p className="text-stone-400 text-xs mt-0.5">{cat._count.products} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-rose-500 font-medium">Featured</span>
            <h2 className="text-2xl md:text-4xl font-bold text-stone-900 mt-1">Featured Products</h2>
            <p className="text-stone-500 mt-1">Hand-picked just for you</p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors group">
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                image={product.images[0]}
                categoryName={product.category.name}
                categorySlug={product.category.slug}
                rating={4.8}
                reviewCount={124}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-rose-400 font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">The JSitemaUang Difference</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌍", title: "Worldwide Shipping", desc: "Fast delivery to over 200 countries with tracking" },
              { icon: "🔒", title: "Secure Payments", desc: "Protected by Stripe's encrypted checkout" },
              { icon: "🎯", title: "Quality Guaranteed", desc: "Carefully curated products from trusted suppliers" },
              { icon: "💬", title: "24/7 Support", desc: "We're here to help anytime you need us" },
            ].map((item, i) => (
              <div key={item.title} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-colors border border-white/5" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e94560_0%,_transparent_70%)] opacity-10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-stone-400 max-w-lg mx-auto mb-8">
              Join thousands of happy customers. Get access to exclusive deals and new arrivals first.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-all"
              >
                Browse Products
              </Link>
              <Link
                href="/account/signup"
                className="inline-flex items-center px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
