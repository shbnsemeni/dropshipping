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
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Quality Products at{" "}
              <span className="text-blue-400">Unbeatable Prices</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Shop from our curated collection of premium products. Fast worldwide shipping with easy returns.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/products?category=electronics"
                className="inline-flex items-center px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Browse Electronics
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&q=80"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <div>
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-gray-300 text-xs">{cat._count.products} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Hand-picked just for you</p>
          </div>
          <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              salePrice={product.salePrice}
              image={product.images[0]}
              categoryName={product.category.name}
              categorySlug={product.category.slug}
            />
          ))}
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              { title: "Worldwide Shipping", desc: "Fast delivery to over 200 countries" },
              { title: "Secure Payments", desc: "Protected by Stripe's secure checkout" },
              { title: "24/7 Support", desc: "We're here to help anytime" },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
