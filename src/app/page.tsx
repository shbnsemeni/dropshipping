import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { HeroSlideshow } from "@/components/HeroSlideshow";

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
      <HeroSlideshow />

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
