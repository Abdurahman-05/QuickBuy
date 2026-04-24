import React from 'react';
import beautypicks from "../../assets/beautypicks.svg"
import computer from "../../assets/computer.svg"
import vediogame from "../../assets/vediogame.svg"
import toy from "../../assets/toy.svg"
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Beauty picks', image: beautypicks, path: '/products?category=audio' },
  { name: 'Computer and accessories', image: computer, path: '/products?category=laptops' },
  { name: 'Video games', image: vediogame, path: '/products?category=home' },
  { name: 'Toys and games', image: toy, path: '/products' },
];

const Category: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Shop by categories</h2>
        <Link to="/categories" className="flex items-center text-sm font-bold text-gray-900 hover:opacity-70 transition-opacity group">
          All categories <span className="ml-2 text-lg leading-none transform group-hover:translate-x-1 transition-transform">──────→</span>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="group cursor-pointer rounded-lg bg-[#efefef] p-10 flex flex-col items-center hover:shadow-xl transition-all duration-300 border-4 border-transparent"
          >
            <div className="w-full aspect-square mb-4 flex items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="max-w-[90%] max-h-[90%] object-contain"
              />
            </div>
            <h3 className="text-sm font-bold text-gray-700 text-center tracking-tight leading-tight">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
