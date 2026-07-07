import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About JSitemaUang</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <strong>JSitemaUang</strong> — your premier destination for quality products at unbeatable prices. 
          We are a dedicated dropshipping store committed to bringing you the best products from around the world.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10">Our Mission</h2>
        <p className="text-gray-600">
          Our mission is simple: to provide high-quality products at affordable prices while ensuring a seamless 
          shopping experience. We carefully curate our product selection to ensure every item meets our quality standards.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {[
            { title: "Quality Products", desc: "Every product is carefully selected from trusted suppliers." },
            { title: "Competitive Prices", desc: "We offer factory-direct prices by working with top manufacturers." },
            { title: "Fast Shipping", desc: "We partner with reliable logistics providers for timely delivery." },
            { title: "Customer Support", desc: "Our team is available to help you with any questions or concerns." },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {[
            { step: "1", title: "Browse & Order", desc: "Explore our catalog and place your order." },
            { step: "2", title: "We Process", desc: "We source and prepare your items for shipping." },
            { step: "3", title: "Delivery", desc: "Your order is shipped directly to your door." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/products"
          className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
