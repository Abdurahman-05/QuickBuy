import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ui/ProductCard";

const Products: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4 md:px-8">
      {/* Header Section (Inspired by Categories) */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 uppercase tracking-tight">
          Our Collection
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
          Discover our curated selection of high-performance electronics and accessories designed for excellence.
        </p>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="mt-20 text-center">
         <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">
            Quality Guaranteed
         </p>
         <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
      </div>
    </div>
  );
};

export default Products;