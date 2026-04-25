import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chapaLogo from '../assets/chapa.jpg';
import telebirrLogo from '../assets/telebirr.jpg';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const navigate = useNavigate();

  const handleCompletePurchase = () => {
    navigate('/order-confirmation');
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a] pb-20">
      {/* 1. Header matching Figma */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-black text-[#E11D48] tracking-tighter">QUICKBUY</Link>
        <Link to="/cart" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Back to Cart</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-4">
        
        {/* Left Side: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Shipping Address Section */}
          <section>
            <h2 className="text-xl font-bold mb-8">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Full Name</label>
                <input type="text" placeholder="Enter your full name" className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm placeholder:text-gray-400" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Street Address</label>
                <input type="text" placeholder="House number and street name" className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm placeholder:text-gray-400" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">City</label>
                <input type="text" placeholder="City" className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>

              {/* Fixed Country Div */}
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Country</label>
                <select className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm appearance-none cursor-pointer">
                  <option>Ethiopia</option>
                </select>
                <div className="absolute right-4 bottom-4 pointer-events-none text-gray-400">▾</div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Phone Number</label>
                <input type="text" placeholder="+251 ..." className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Email Address</label>
                <input type="email" placeholder="email@example.com" className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
            </div>
          </section>

          {/* Payment Method Section */}
          <section>
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-4">
              
              {/* Chapa Option */}
              <div 
                onClick={() => setPaymentMethod('chapa')}
                className={`border-2 p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'chapa' ? 'border-black' : 'border-gray-100 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Figma-style Logo Box */}
                  <div className="w-14 h-11 bg-[#003b44] rounded flex items-center justify-center p-2">
                     <img src={chapaLogo} alt="Chapa" className="h-full w-auto object-contain" />
                  </div>
                  <span className="font-black text-xs tracking-widest uppercase">Pay by Chapa</span>
                </div>
                {/* Figma-style Radio Dot */}
                <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${paymentMethod === 'chapa' ? 'border-black' : 'border-gray-200'}`}>
                  {paymentMethod === 'chapa' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                </div>
              </div>

              {/* Telebirr Option */}
              <div 
                onClick={() => setPaymentMethod('telebirr')}
                className={`border-2 p-5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'telebirr' ? 'border-black' : 'border-gray-100 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-11 bg-[#00adef] rounded flex items-center justify-center p-2">
                     <img src={telebirrLogo} alt="Telebirr" className="h-full w-auto object-contain" />
                  </div>
                  <span className="font-black text-xs tracking-widest uppercase">Pay by Telebirr</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${paymentMethod === 'telebirr' ? 'border-black' : 'border-gray-200'}`}>
                  {paymentMethod === 'telebirr' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#F6F6F6] p-6 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[40px] sticky top-6 sm:top-10">
            <h2 className="text-xl font-bold mb-10 text-gray-800">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-gray-100 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" alt="Studio Pulse" className="max-h-full" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Studio Pulse Wireless</h4>
                  <p className="text-[11px] text-gray-400 font-bold mt-1">Matte Black | Qty: 1</p>
                  <p className="font-extrabold text-sm mt-1">$299.00</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm border border-gray-100 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop" alt="QuickWatch" className="max-h-full" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">QuickWatch Series 8</h4>
                  <p className="text-[11px] text-gray-400 font-bold mt-1">Silver / 44mm | Qty: 1</p>
                  <p className="font-extrabold text-sm mt-1">$399.00</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mb-8" />

            {/* Calculations */}
            <div className="space-y-4 text-xs font-bold text-gray-400 mb-10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black">$698.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-red-500 uppercase">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Taxes</span>
                <span className="text-black">$55.84</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-10 border-t pt-8 border-gray-200">
              <span className="text-2xl font-bold">Total</span>
              <span className="text-3xl font-black">$753.84</span>
            </div>

            <button
              onClick={handleCompletePurchase}
              className="w-full py-6 bg-[#1a1a1a] text-white rounded-[20px] font-black tracking-widest text-[11px] uppercase hover:bg-black transition-all shadow-xl"
            >
              Complete Purchase
            </button>
            
            <p className="text-center text-[9px] font-black text-gray-400 mt-8 tracking-widest uppercase">
              Secure SSL Encrypted Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}