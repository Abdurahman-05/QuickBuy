import React, { useState } from 'react';
import { Minus, Plus, X, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'SONIC-X PRO HEADPHONES',
      description: 'COLOR: OBSIDIAN BLACK / BLUETOOTH 5.2',
      price: 449.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    },
    {
      id: 2,
      name: 'AERO-WATCH SERIES 7',
      description: 'SIZE: 44MM / ALPINE WHITE',
      price: 299.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
    },
  ]);

  return (
    <div className="bg-white min-h-screen p-4 md:p-12 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-medium mb-4">Your Cart</h1>
          <p className="text-gray-500 max-w-md text-sm">
            Curated technology awaiting its final destination. Review your selection before completing the acquisition.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-100 pb-8">
                <div className="w-32 h-32 bg-[#F5F5F5] rounded-3xl flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full mix-blend-multiply" />
                </div>
                
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm tracking-tight">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase">Unit Price: ${item.price}</p>
                      <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center bg-[#F9F9F9] rounded-full px-4 py-1 border border-gray-100">
                      <button className="hover:text-black text-gray-400"><Minus size={14} /></button>
                      <span className="px-6 font-bold text-sm">{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</span>
                      <button className="hover:text-black text-gray-400"><Plus size={14} /></button>
                    </div>
                    <button className="text-gray-300 hover:text-red-500 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#EDEDED] rounded-[2.5rem] p-8">
              <h2 className="text-xs font-bold tracking-[0.2em] mb-8 uppercase">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                  <span>Subtotal</span>
                  <span className="text-black">$1,047.00</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                  <span>Shipping</span>
                  <span className="text-black tracking-widest">FREE</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tight border-b border-gray-300 pb-4">
                  <span>Estimated Tax</span>
                  <span className="text-black">$84.50</span>
                </div>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Grand Total</span>
                  <span className="text-3xl font-black">$1,131.50</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2 tracking-widest">Promo Code</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="ENTER CODE" className="flex-grow bg-white rounded-xl px-4 py-3 text-[10px] focus:outline-none" />
                  <button className="bg-black text-white text-[10px] font-bold px-5 py-3 rounded-xl">APPLY</button>
                </div>
              </div>

              <button className="w-full bg-black text-white rounded-full py-5 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase">Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex justify-center gap-6 text-[8px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck size={12} />
                  <span>2-Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;