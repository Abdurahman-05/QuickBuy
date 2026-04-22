import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white py-20 px-8 lg:px-24 mt-auto rounded-t-[40px]">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

        {/* Left Section: Logo and Slogan */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F42929] rounded-[2px]" />
            <span className="text-2xl font-bold tracking-tight text-white">Quick<span className="text-[#F42929]">Buy</span></span>
          </div>
          <p className="text-[10px] leading-6 tracking-[0.2em] text-gray-500 font-bold uppercase max-w-[300px]">
            Curating the world's most advanced electronics for the modern minimalist.
          </p>
        </div>

        {/* Center Section: Links */}
        <div className="flex flex-col gap-6 md:pl-10">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-200">Customer Care</h3>
          <ul className="flex flex-col gap-4 text-[11px] text-gray-500 uppercase tracking-[0.1em] font-bold">
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/support" className="hover:text-white transition-colors">Support Center</Link></li>
          </ul>
        </div>

        {/* Right Section: Social & Copyright */}
        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex flex-col gap-6 md:items-end">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-200">Follow Us</h3>
            <div className="flex gap-6 text-gray-400">
              <button className="hover:text-white transition-colors"><ShareIcon /></button>
              <button className="hover:text-white transition-colors"><GlobeIcon /></button>
              <button className="hover:text-white transition-colors"><AtIcon /></button>
            </div>
          </div>
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.25em] font-bold md:text-right mt-16">
            © 2026 QuickBuy Electronics. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

// Minimalist Icons for Footer
function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
    </svg>
  );
}