import { useEffect, useState } from 'react';
import CategoryCard from '../components/categories/CategoryCard';
import NewsletterSection from '../components/categories/NewsletterSection';
import api from "../lib/axios";
import smartwatch from "../assets/Smartwatch.svg";
import headphone from "../assets/heroimg.svg";

const categoriesTemplate = [
  // ── ROW 1: 3 equal columns ──
  {
    label: 'COMPUTING',
    title: 'Laptops & Computing',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    linkText: 'Shop Now',
    linkTo: '/products?category=laptops',
    bgColor: '#eaeaea',
  },
  {
    label: 'AUDIO',
    title: 'Audio & Sound',
    image: headphone,
    linkText: 'Explore Collection',
    linkTo: '/products?category=audio',
    bgColor: '#f0f0f0',
  },
  {
    label: 'LIFESTYLE',
    title: 'Wearables',
    image: smartwatch,
    linkText: 'View Series',
    linkTo: '/products?category=wearables',
    bgColor: '#f5f5f5',
  },
  // ── ROW 2: Wide card (2 cols) + normal card (1 col) ──
  {
    label: 'AUTOMATION',
    title: 'Smart Home & Living',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
    linkText: 'Configure Home',
    linkTo: '/products?category=home',
    wide: true,
    bgColor: '#f0f0f0',
  },
  {
    label: 'ESSENTIALS',
    title: 'General Collection',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800',
    linkText: 'View All',
    linkTo: '/products?category=general',
    bgColor: '#e8eaed',
  },
];

export default function Categories() {
  const [apiCategories, setApiCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("categories");
        const incoming = Array.isArray(response.data)
          ? response.data.map((c: any) => String(c?.name || "").trim()).filter(Boolean)
          : [];
        setApiCategories(incoming);
      } catch {
        setApiCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const resolveCategoryParam = (preferred: string) => {
    const normalizedPreferred = preferred.toLowerCase();
    const exact = apiCategories.find((c) => c.toLowerCase() === normalizedPreferred);
    if (exact) return exact.toLowerCase();
    const soft = apiCategories.find((c) => c.toLowerCase().includes(normalizedPreferred));
    if (soft) return soft.toLowerCase();
    return preferred;
  };

  const categories = categoriesTemplate.map((cat) => {
    if (cat.linkTo.includes("category=laptops")) {
      return { ...cat, linkTo: `/products?category=${resolveCategoryParam("laptops")}` };
    }
    if (cat.linkTo.includes("category=audio")) {
      return { ...cat, linkTo: `/products?category=${resolveCategoryParam("audio")}` };
    }
    if (cat.linkTo.includes("category=wearables")) {
      return { ...cat, linkTo: `/products?category=${resolveCategoryParam("wearables")}` };
    }
    if (cat.linkTo.includes("category=home")) {
      return { ...cat, linkTo: `/products?category=${resolveCategoryParam("wearables")}` };
    }
    if (cat.linkTo.includes("category=general")) {
      return { ...cat, linkTo: "/products?category=all" };
    }
    return cat;
  });

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-24">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-14">
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-black tracking-tight leading-[1.1] text-black">
            Explore Categories
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm md:text-[15px] mt-2 sm:mt-3 max-w-md leading-relaxed">
            Discover our curated selection of high-end electronics, designed for performance and aesthetic excellence.
          </p>
        </div>

        {/* Category Grid — responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Row 1: 3 equal columns */}
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.label} {...cat} />
          ))}

          {/* Row 2: Wide card (2 cols on sm+) + normal card */}
          {categories.slice(3).map((cat) => (
            <CategoryCard key={cat.label} {...cat} />
          ))}
        </div>

        {/* Newsletter */}
        <NewsletterSection />
      </main>
    </div>
  );
}
