import React from 'react';
import womanImg from '../../assets/womenimg.svg';
import manImg from '../../assets/menimg.svg';
import { Link } from 'react-router-dom';

const promos = [
  {
    title: "Comfy style for her.✨",
    description: "Shop from quickbuy fashion including shoes, clothes, handbags and much more.😋",
    image: womanImg,
    linkText: "Explore"
  },
  {
    title: "Comfy style for him.✨",
    description: "Shop from quickbuy fashion including shoes, clothes, handbags and much more.😋",
    image: manImg,
    linkText: "Explore"
  }
];

const PromoSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {promos.map((promo, idx) => (
          <div
            key={idx}
            className="group relative bg-[#f2f2f2] rounded-[3rem] overflow-hidden flex flex-col sm:flex-row items-center min-h-[400px] md:min-h-[420px] hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-white"
          >
            {/* Text Content */}
            <div className="flex-1 p-8 md:p-14 z-10 w-full sm:w-3/5 text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-[1000] text-gray-900 mb-6 leading-tight">
                {promo.title}
              </h2>
              <p className="text-gray-500 text-[13px] md:text-sm font-bold mb-8 md:mb-10 max-w-[240px] mx-auto sm:mx-0 leading-relaxed">
                {promo.description}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1 font-[1000] text-[12px] text-gray-900 hover:text-[#e60000] transition-colors uppercase tracking-[0.2em] group/link"
              >
                {promo.linkText}
                <span className="ml-1 transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>

            {/* Image Content */}
            <div className="relative sm:absolute right-0 bottom-0 w-full sm:w-[45%] h-64 sm:h-full bg-[#e5e5e5] sm:bg-transparent overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-all duration-&lsqb;2000ms&rsqb; opacity-95 group-hover:opacity-100"
              />
              {/* Soft Gradient (only visible on sm and up) */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#f2f2f2] via-[#f2f2f2]/40 to-transparent w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
