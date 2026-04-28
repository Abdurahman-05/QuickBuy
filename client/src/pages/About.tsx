import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Gem, Lock, Zap, MessagesSquare, ArrowRight } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const About: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  useEffect(() => {
    if (products.length === 0) {
      void getAllProducts();
    }
  }, [getAllProducts, products.length]);

  const stats = useMemo(() => {
    const productCount = products.length;
    const normalizedCategories = products
      .map((p) => String(p.category || "").trim().toUpperCase())
      .filter(Boolean);
    const uniqueCategories = new Set(normalizedCategories).size;
    const inStockCategories = new Set(
      products
        .filter((p) => !String(p.stockInfo || "").toLowerCase().includes("out"))
        .map((p) => String(p.category || "").trim().toUpperCase())
        .filter(Boolean)
    ).size;
    const averageRating =
      productCount > 0
        ? (
            products.reduce((sum, p) => sum + Number(p.rating || 0), 0) / productCount
          ).toFixed(1)
        : "0.0";

    return [
      { label: "Products Curated", value: String(productCount) },
      { label: "Categories Available", value: String(uniqueCategories) },
      { label: "Active Categories", value: String(inStockCategories) },
      { label: "Average Product Rating", value: `${averageRating}/5` },
    ];
  }, [products]);

  const highlights = [
    {
      title: "Curated Premium Selection",
      description:
        "Every item is handpicked for quality, performance, and long-term reliability.",
      icon: Gem,
    },
    {
      title: "Secure, Trusted Shopping",
      description:
        "From checkout to delivery, your orders are protected with modern security standards.",
      icon: Lock,
    },
    {
      title: "Fast, Reliable Delivery",
      description:
        "Quick fulfillment and transparent tracking keep you updated from cart to doorstep.",
      icon: Zap,
    },
    {
      title: "Real Human Support",
      description:
        "Our team helps you choose the right product and solves issues quickly when needed.",
      icon: MessagesSquare,
    },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute -top-28 -right-24 h-64 w-64 rounded-full bg-red-50 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-12 sm:pb-14">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
            About QuickBuy
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 max-w-4xl leading-tight">
            We make premium tech shopping simple, fast, and trustworthy.
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-[15px] text-gray-500 leading-relaxed">
            QuickBuy is built for people who value high-performance products and clean buying experiences.
            We focus on quality-first curation, transparent service, and modern design to help you discover
            the right tools for work, life, and everything in between.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-gray-800 transition-colors"
            >
              Explore Products
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center rounded-full border border-gray-300 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-5 text-center">
              <p className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">{stat.value}</p>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-3xl border border-gray-200/70 bg-gradient-to-b from-white to-gray-50/60 p-6 sm:p-7 shadow-[0_8px_26px_-24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_30px_-20px_rgba(0,0,0,0.2)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-gray-900 text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-4 text-lg sm:text-[22px] font-bold tracking-tight text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-gray-200 to-transparent" />
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
                  QuickBuy Standard
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black text-white p-8 sm:p-10 lg:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Our Promise</p>
          <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-3xl">
            Better products, smoother experience, and service you can actually trust.
          </h3>
          <p className="mt-4 max-w-2xl text-sm sm:text-[15px] text-gray-300 leading-relaxed">
            Whether you are buying your next daily driver laptop, premium audio gear, or smart accessories,
            QuickBuy is designed to keep the process clear, fast, and enjoyable from first click to final delivery.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Start Shopping
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
