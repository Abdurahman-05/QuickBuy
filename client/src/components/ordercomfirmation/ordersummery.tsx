import React from 'react';
import headphonesImg from '../../assets/headphones.jpg';
import laptopImg from '../../assets/laptop.jpg';

const OrderSummery: React.FC = () => {
    return (
        <section className="mb-24 w-full max-w-[850px] mx-auto">
            <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">Order Summary</h2>
            <div className="flex gap-14">
                {/* Left - Items List */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Item 1 */}
                    <div className="flex gap-5 items-start">
                        <div className="w-[100px] h-[100px] bg-gradient-to-br from-black to-gray-800 rounded-3xl overflow-hidden flex-shrink-0 shadow-md">
                            <img src={headphonesImg} alt="Headphones" className="w-full h-full object-cover opacity-90" />
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="text-[15px] font-bold text-black leading-tight mb-1.5">Studio-H1 Wireless Headphones</h3>
                            <p className="text-[13px] text-gray-500 leading-snug pr-4">Carbon Black Finish • High-Fidelity Audio • Noise Cancellation</p>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-4">Quantity: 1</p>
                        </div>
                        <div className="font-bold text-black text-[15px] pt-1">$399.00</div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex gap-5 items-start">
                        <div className="w-[100px] h-[100px] bg-[#f8f9fa] rounded-3xl overflow-hidden flex flex-shrink-0 items-center justify-center shadow-md p-2">
                            <img src={laptopImg} alt="Laptop" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="text-[15px] font-bold text-black leading-tight mb-1.5">Titan 16 Professional Laptop</h3>
                            <p className="text-[13px] text-gray-500 leading-snug pr-4">Silver Aluminum • 32GB RAM • 1TB SSD • Retina Display</p>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-4">Quantity: 1</p>
                        </div>
                        <div className="font-bold text-black text-[15px] pt-1">$1,099.00</div>
                    </div>
                </div>

                {/* Right - Summary Sidebar */}
                <div className="w-[320px] bg-[#f8f9fa] rounded-3xl p-8 flex-shrink-0">
                    {/* Shipping Address */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Shipping Address</p>
                        <p className="text-[14px] text-black font-medium leading-relaxed">
                            Alex Sterling<br/>
                            1284 Editorial Avenue<br/>
                            Suite 400<br/>
                            New York, NY 10001
                        </p>
                    </div>
                    {/* Payment Method */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</p>
                        <div className="flex items-center gap-2.5 text-[14px] text-black font-medium">
                            <div className="w-9 h-6 bg-white rounded border border-gray-200 flex flex-col items-center justify-center">
                                <span className="text-[9px] font-black italic tracking-tighter text-[#1434CB]">VISA</span>
                            </div>
                            Visa ending in **** 4922
                        </div>
                    </div>
                    
                    {/* Totals */}
                    <div className="pt-6 border-t border-gray-200/80 flex flex-col gap-3.5 text-[14px] font-medium">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-black font-semibold">$1,498.00</span>
                        </div>
                        <div className="flex justify-between text-gray-500 items-center">
                            <span>Shipping</span>
                            <span className="text-red-500 uppercase tracking-widest text-[11px] font-bold">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Tax</span>
                            <span className="text-black font-semibold">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center text-black mt-2 pt-6 border-t border-black">
                            <span className="text-[12px] uppercase font-bold tracking-widest">Total</span>
                            <span className="text-xl font-bold">$1,498.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSummery;
