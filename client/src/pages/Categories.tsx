import React from "react";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-black mb-4">Shop by Categories</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Find exactly what you're looking for by browsing our curated collections.
      </p>
      <Link
        to="/products"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        View All Products
      </Link>
    </div>
  );
};

export default Categories;
