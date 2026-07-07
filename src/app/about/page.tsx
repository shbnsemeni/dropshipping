"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-rose-500 font-medium">About Us</span>
        <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mt-2">About JSitemaUang</h1>
        <p className="text-lg text-stone-500 mt-4 max-w-2xl mx-auto">
          Your premier destination for quality products at unbeatable prices.
        </p>
      </div>

      <div className="max-w-none space-y-8">
        <div className="bg-stone-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Mission</h2>
          <p className="text-stone-600 leading-relaxed">
            Our mission is simple: to provide high-quality products at affordable prices while ensuring a seamless shopping experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Quality Products", desc: "Every product is carefully selected from trusted suppliers." },
              { title: "Competitive Prices", desc: "We offer factory-direct prices by working with top manufacturers." },
              { title: "Fast Shipping", desc: "We partner with reliable logistics providers for timely delivery." },
              { title: "24/7 Support", desc: "Our team is available to help with any questions." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { step: "1", title: "Browse & Order", desc: "Explore our catalog and place your order." },
              { step: "2", title: "We Process", desc: "We source and prepare your items for shipping." },
              { step: "3", title: "Delivery", desc: "Your order is shipped directly to your door." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-rose-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/products" className="inline-flex items-center px-8 py-3.5 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-all">
          Start Shopping
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </div>
  );
}
