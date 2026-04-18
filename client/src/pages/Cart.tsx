import React from "react";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-black mb-4">Your Cart</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Your shopping cart is currently empty. Start exploring our latest products.
      </p>
      <Link
        to="/products"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default Cart;
