import React from 'react';

export default function Checkout() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Left Side: Shipping & Payment */}
      <div className="md:col-span-2 space-y-8">
        <h2 className="text-2xl font-bold">Shipping Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-4 bg-gray-100 rounded-lg" placeholder="Full Name" />
          <input className="w-full p-4 bg-gray-100 rounded-lg" placeholder="Street Address" />
        </div>
        {/* Add more inputs for City, Country, Phone, Email... */}
        
        <h2 className="text-2xl font-bold mt-8">Payment Method</h2>
        <div className="border-2 border-black p-4 rounded-xl flex items-center justify-between">
          <span>Pay by Chapa</span>
          <div className="w-5 h-5 rounded-full border-2 border-black" />
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between"><span>Subtotal</span><span>$700.00</span></div>
          <div className="flex justify-between text-red-500"><span>Shipping</span><span>FREE</span></div>
        </div>
        <div className="border-t pt-4 font-bold text-xl flex justify-between">
          <span>Total</span><span>$753.84</span>
        </div>
        <button className="w-full bg-black text-white py-4 rounded-xl mt-6 font-bold">
          COMPLETE PURCHASE
        </button>
      </div>
    </div>
  );
}