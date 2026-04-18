import React from "react";
import { Link } from "react-router-dom";

const Wishlist: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-black mb-4">My Wishlist</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Save your favorite items here to keep track of what you love.
      </p>
      <Link
        to="/products"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Discover Products
      </Link>
    </div>
  );
};

export default Wishlist;
