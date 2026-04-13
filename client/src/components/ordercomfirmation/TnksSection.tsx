import React from 'react';

const TnksSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-6 text-white font-bold text-2xl">
        ✓
      </div>
      <h1 className="text-[36px] font-bold tracking-tight leading-tight mb-4">
        Thank you! Your order has been placed successfully.
      </h1>
      <p className="text-gray-500 text-[15px] mb-10">
        We've sent a confirmation email to your inbox with all the details.
      </p>
      <div className="flex gap-4 mb-14">
        <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold">Track Order</button>
        <button className="bg-white text-black border border-gray-300 px-8 py-3 rounded-full text-sm font-bold">Continue Shopping</button>
      </div>
      <div className="grid grid-cols-3 w-full bg-gray-50 rounded-xl py-8">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order Number</p>
          <p className="text-[15px] font-bold">#QB-8294-0129</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Expected Delivery</p>
          <p className="text-[15px] font-bold">Oct 24, 2024</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Amount</p>
          <p className="text-[15px] font-bold">$1,498.00</p>
        </div>
      </div>
    </div>
  );
};

export default TnksSection;