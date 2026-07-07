"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/products"
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-stone-900 text-white"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
        )}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?category=${cat.slug}`}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === cat.slug
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
