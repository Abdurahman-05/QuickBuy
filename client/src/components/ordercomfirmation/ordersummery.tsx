import React from 'react';

const OrderSummery: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-[14px] font-bold tracking-widest uppercase mb-8 text-gray-400">Order Summary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Item 1 */}
          <div className="flex justify-between items-start">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-[#F3F4F6] rounded-xl flex items-center justify-center p-2">
                <img src="/headset.png" alt="Headset" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[16px]">Studio-H1 Wireless Headphones</h3>
                <p className="text-[12px] text-gray-400">Quantity: 1</p>
              </div>
            </div>
            <p className="font-bold text-[15px]">$399.00</p>
          </div>

          {/* Item 2 */}
          <div className="flex justify-between items-start">
            <div className="flex gap-6">
              <div className="w-24 h-24 bg-[#F3F4F6] rounded-xl flex items-center justify-center p-2">
                <img src="/laptop.png" alt="Laptop" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[16px]">Titan 16 Professional Laptop</h3>
                <p className="text-[12px] text-gray-400">Quantity: 1</p>
              </div>
            </div>
            <p className="font-bold text-[15px]">$1,099.00</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-10">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Shipping Address</h4>
            <div className="text-[13px] text-gray-700">
              <p className="font-bold text-black">Alex Sterling</p>
              <p>1284 Editorial Avenue, Suite 400</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
            <div className="flex justify-between text-[13px]"><span>Subtotal</span><span className="font-bold">$1,498.00</span></div>
            <div className="flex justify-between text-[13px]"><span>Shipping</span><span className="font-bold text-green-600">FREE</span></div>
            <div className="flex justify-between text-[16px] font-bold border-t pt-4 mt-2"><span>Total</span><span>$1,498.00</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;