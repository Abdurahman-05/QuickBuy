import React from 'react';
import { Link } from "react-router-dom";

const TnksSection: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center mt-8 sm:mt-12 mb-10 sm:mb-16 px-4">
            {/* Checkmark icon */}
            <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>

            <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-tight font-extrabold text-black mb-4 tracking-tight max-w-[600px]">
                Thank you! Your order has been placed successfully.
            </h1>

            <p className="text-gray-500 text-[14px] sm:text-[15px] mb-8 sm:mb-10">
                We've sent a confirmation email to your inbox with all the details.
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
