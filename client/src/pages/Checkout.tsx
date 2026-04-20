import React from 'react';
import chapaLogo from '../assets/chapa.jpg';
import telebirrLogo from '../assets/telebirr.jpg';

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
        
        <h2 className="text-2xl font-bold mt-8">Payment Method</h2>
        <div className="space-y-4">
          {/* Chapa Option - Use {chapaLogo} */}
          <label className="border-2 border-black p-4 rounded-xl flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={chapaLogo} alt="Chapa" className="h-8 w-auto rounded" />
              <span className="font-semibold">Pay with Chapa</span>
            </div>
            <input type="radio" name="payment" className="w-5 h-5 accent-black" />
          </label>

          {/* Telebirr Option - Use {telebirrLogo} */}
          <label className="border-2 border-gray-200 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-gray-400">
            <div className="flex items-center gap-3">
              <img src={telebirrLogo} alt="Telebirr" className="h-8 w-auto rounded" />
              <span className="font-semibold">Pay with Telebirr</span>
            </div>
            <input type="radio" name="payment" className="w-5 h-5 accent-black" />
          </label>
        </div>
      </div> {/* Added this closing div */}

      {/* Right Side: Order Summary (You can add the rest of your summary code here) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        {/* Add summary details here */}
      </div>
    </div>
  );
}