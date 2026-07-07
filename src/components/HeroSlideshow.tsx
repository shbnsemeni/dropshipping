"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

interface SlideProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  images: string[];
  category: { name: string; slug: string };
  description: string;
}

export function HeroSlideshow() {
  const [slides, setSlides] = useState<SlideProduct[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (loading) {
    return (
      <section className="h-[70vh] md:h-[85vh] bg-stone-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-28 md:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">Discover Quality Products at Unbeatable Prices</h1>
            <Link href="/products" className="mt-8 inline-flex items-center px-8 py-3.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-all">Shop Now</Link>
          </div>
        </div>
      </section>
    );
  }

  const slide = slides[current];
  const hasDiscount = slide.salePrice && slide.salePrice < slide.price;
  const discountPercent = hasDiscount ? Math.round((1 - slide.salePrice! / slide.price) * 100) : 0;

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden bg-stone-950">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <div className="absolute inset-0">
            <img src={s.images[0]} alt={s.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 animate-fade-in">
              <Link href={`/products?category=${slide.category.slug}`} className="inline-flex items-center px-3 py-1 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium rounded-full hover:bg-rose-500/30 transition-colors">
                {slide.category.name}
              </Link>
              {hasDiscount && (
                <span className="inline-flex items-center px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium rounded-full">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4 animate-fade-in stagger-1">
              {slide.name}
            </h2>
            <p className="text-base md:text-lg text-stone-300 max-w-lg mb-6 line-clamp-2 animate-fade-in stagger-2">
              {slide.description}
            </p>
            <div className="flex items-baseline gap-3 mb-8 animate-fade-in stagger-2">
              {hasDiscount ? (
                <>
                  <span className="text-3xl md:text-4xl font-bold text-rose-400">${slide.salePrice!.toFixed(2)}</span>
                  <span className="text-lg text-stone-500 line-through">${slide.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-white">${slide.price.toFixed(2)}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 animate-fade-in stagger-3">
              <Link href={`/products/${slide.slug}`} className="inline-flex items-center px-7 py-3.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 active:scale-[0.98]">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Link>
              <Link href="/products" className="inline-flex items-center px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-rose-500" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
