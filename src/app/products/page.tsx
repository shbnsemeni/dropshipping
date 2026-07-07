import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { category, search, sort } = params;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const where: any = {};

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) where.categoryId = cat.id;
  }

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const orderBy: any = sort === "price_asc" ? { price: "asc" } : sort === "price_desc" ? { price: "desc" } : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy,
  });

  const parsedProducts = products.map((p) => ({ ...p, images: JSON.parse(p.images) }));

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
          {activeCategory ? activeCategory.name : search ? `Search: "${search}"` : "All Products"}
        </h1>
        <p className="text-stone-500 mt-1">
          {parsedProducts.length} {parsedProducts.length === 1 ? "product" : "products"}
          {activeCategory ? ` in ${activeCategory.name}` : ""}
          {search ? ` for "${search}"` : ""}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2 flex-1">
          <a
            href="/products"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              !category ? "bg-stone-900 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.slug}${search ? `&search=${search}` : ""}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                category === cat.slug ? "bg-stone-900 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          <a
            href={`/products?${new URLSearchParams({ ...(category ? { category } : {}), ...(search ? { search } : {}), sort: "newest" }).toString()}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              !sort || sort === "newest" ? "bg-stone-100 text-stone-900" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            }`}
          >
            Newest
          </a>
          <a
            href={`/products?${new URLSearchParams({ ...(category ? { category } : {}), ...(search ? { search } : {}), sort: "price_asc" }).toString()}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              sort === "price_asc" ? "bg-stone-100 text-stone-900" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            }`}
          >
            Price: Low
          </a>
          <a
            href={`/products?${new URLSearchParams({ ...(category ? { category } : {}), ...(search ? { search } : {}), sort: "price_desc" }).toString()}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              sort === "price_desc" ? "bg-stone-100 text-stone-900" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
            }`}
          >
            Price: High
          </a>
        </div>
      </div>

      {parsedProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-stone-400" />
          </div>
          <h2 className="text-xl font-semibold text-stone-900 mb-2">No products found</h2>
          <p className="text-stone-500 mb-6">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          <a href="/products" className="inline-flex items-center px-6 py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors">
            Clear Filters
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {parsedProducts.map((product) => (
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
              rating={4.5}
              reviewCount={89}
            />
          ))}
        </div>
      )}
    </div>
  );
}
