import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { category, search } = params;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const where: any = {};

  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) where.categoryId = cat.id;
  }

  if (search) {
    where.name = { contains: search };
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const parsedProducts = products.map((p) => ({ ...p, images: JSON.parse(p.images) }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        {search && (
          <p className="text-gray-500 mt-1">Search results for: &quot;{search}&quot;</p>
        )}
        {category && (
          <p className="text-gray-500 mt-1">
            Category: {categories.find((c) => c.slug === category)?.name || category}
          </p>
        )}
      </div>

      <CategoryFilter categories={categories} activeCategory={category || ""} />

      {parsedProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found.</p>
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
