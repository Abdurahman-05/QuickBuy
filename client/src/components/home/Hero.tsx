import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/heroimg.svg';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#f5f5f5] py-12 md:py-24 overflow-hidden min-h-[600px] md:min-h-[650px] flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full h-full relative">
        
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="z-10 flex-[1.2] max-w-xl flex flex-col items-start gap-6 md:gap-10 text-center md:text-left items-center md:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.1] tracking-tight">
            SHOP COMPUTERS <br className="hidden md:block" /> & ACCESSORIES.
          </h1>
          
          <p className="text-gray-500 text-sm md:text-lg leading-relaxed max-w-sm font-medium">
            shop laptops, desktops, headsets, mouses, and much more click below to taste the possibilities.
          </p>
          
          <Link 
            to="/products"
            className="bg-black text-white px-10 md:px-16 py-4 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 inline-block"
          >
            View more
          </Link>
        </div>

        {/* RIGHT SIDE: PREMIUM VISUALS */}
        <div className="relative flex-1 md:flex-[0.8] mt-16 md:mt-0 flex items-center justify-center md:justify-end w-full max-w-xl h-[400px] md:h-[500px]">
          {/* Tight Visual Group Container */}
          <div className="relative w-full transform -translate-y-4 md:-translate-y-12 transition-transform duration-1000">
            
            {/* Main Product Image Group */}
            <div className="relative w-full flex justify-center md:justify-end pr-0 md:pr-4 lg:pr-8">
              <Link to="/products" className="relative z-30 block">
                <img 
                  src={heroImg} 
                  alt="Premium Headphones" 
                  className="w-full h-auto max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[400px] object-contain drop-shadow-sm select-none cursor-pointer transform hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              {/* Soft Realistic GROUND Shadow */}
              <div className="absolute bottom-[-15px] left-1/2 md:left-[60%] -translate-x-1/2 w-[85%] h-12 bg-black/5 blur-[50px] rounded-[100%] z-0" />

              {/* FLOATING PRODUCT CARD */}
              <Link 
                to="/products/wireless-headphones"
                className="absolute -bottom-10 md:bottom-2 left-4 sm:left-10 md:-left-8 lg:-left-12 z-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.1)] p-5 md:p-6 w-full max-w-[200px] sm:max-w-[230px] border border-white/50 flex flex-col gap-2 group transition-all duration-700 hover:-translate-y-2 cursor-pointer"
              >
                <h3 className="text-[13px] md:text-[15px] font-semibold text-black leading-tight tracking-tight">
                  Bluetooth wireless <br /> headphones
                </h3>
                
                {/* Star Rating Row */}
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#F2C94C] fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <svg className="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
                
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                  1k+ shipped
                </p>
                
                {/* Price Row */}
                <div className="flex items-baseline gap-2 pt-1 border-b border-gray-100 pb-2 mb-1">
                  <span className="text-[20px] md:text-[24px] font-bold text-black tracking-tighter leading-none">$33.00</span>
                  <span className="text-xs md:text-sm font-medium text-gray-400 line-through tracking-tighter">$71.34</span>
                </div>

                <span className="text-[10px] md:text-[11px] font-bold text-gray-400 opacity-80 flex items-center gap-1 group-hover:text-black transition-colors cursor-pointer">
                  view more <span className="text-sm">→</span>
                </span>
              </Link>
            </div>

            {/* SECONDARY ACTION BUTTON (CENTERED AT THE BOTTOM) */}
            <div className="absolute bottom-[-20px] md:bottom-[-60px] left-1/2 -translate-x-1/2 z-30 hidden md:block">
              <Link 
                to="/product"
                className="bg-black text-white px-20 py-4 rounded-full font-bold flex items-center gap-4 shadow-[0_20px_45px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 group whitespace-nowrap"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm tracking-[0.25em] font-bold uppercase">shop now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE SHOP NOW BUTTON (CENTERED) */}
        <div className="mt-20 md:hidden flex justify-center w-full z-30">
          <Link 
            to="/product"
            className="bg-black text-white px-24 py-4 rounded-full font-bold flex items-center gap-4 shadow-xl active:scale-95 transition-all whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[13px] tracking-[0.2em] font-bold uppercase">shop now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
