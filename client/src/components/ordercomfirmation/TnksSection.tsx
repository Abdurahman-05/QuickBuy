import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const TnksSection: React.FC = () => {
    const [showPopout, setShowPopout] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowPopout(false), 5500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-center mt-8 sm:mt-12 mb-10 sm:mb-16 px-4">
            {/* Floating confirmation popout */}
            {showPopout && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[120] w-[92%] max-w-sm animate-in fade-in zoom-in-95 duration-300">
                    <div className="relative rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.12)] px-4 py-4 text-left">
                        <button
                            onClick={() => setShowPopout(false)}
                            className="absolute right-2 top-2 h-7 w-7 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition"
                            aria-label="Dismiss notification"
                        >
                            ✕
                        </button>
                        <div className="flex items-start gap-3 pr-6">
                            <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">Order Confirmed</p>
                                <h3 className="text-[15px] font-extrabold text-gray-900 mt-0.5">Confirmation sent successfully</h3>
                                <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                                    We sent your order details to your email inbox.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkmark icon */}
            <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>

            <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-tight font-extrabold text-black mb-4 tracking-tight max-w-[600px]">
                Thank you! Your order has been placed successfully.
            </h1>

            <p className="text-gray-500 text-[14px] sm:text-[15px] mb-8 sm:mb-10">
                Your order is now in progress and ready for fulfillment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16 w-full sm:w-auto">
                <Link to="/dashboard/orders" className="bg-[#1a1a1a] text-white px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-black transition-all shadow-sm text-center">
                    Track Order
                </Link>
                <Link to="/products" className="bg-white text-black border border-gray-300 px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-gray-50 transition-all text-center">
                    Continue Shopping
                </Link>
            </div>

            {/* Info Box */}
            <div className="bg-[#f8f9fa] rounded-3xl w-full max-w-[850px] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 px-6 sm:px-10 lg:px-16 py-8 sm:py-10 text-left">
                <div className="flex flex-col gap-1.5">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order Number</p>
                    <p className="text-[17px] text-black font-semibold">#QB-8294-0129</p>
                </div>
                <div className="flex flex-col gap-1.5 sm:border-l border-gray-200 sm:pl-8 lg:pl-16">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Expected Delivery</p>
                    <p className="text-[17px] text-black font-semibold">Oct 24, 2024</p>
                </div>
                <div className="flex flex-col gap-1.5 sm:border-l border-gray-200 sm:pl-8 lg:pl-16">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                    <p className="text-[17px] text-black font-semibold">$1,498.00</p>
                </div>
            </div>
        </section>
    );
};

export default TnksSection;
