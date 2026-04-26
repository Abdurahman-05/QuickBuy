import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white py-12 md:py-16 px-6 lg:px-20 mt-20 rounded-t-[40px]">
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* 1. LOGO & SLOGAN (Matches Navbar exactly) */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2">
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[26px] w-[22px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.0009 23.4923C21.0609 24.1336 20.846 24.7744 20.411 25.2506C19.9762 25.7265 19.3565 25.9997 18.7106 25.9997H2.30017C1.65426 25.9997 1.03462 25.7265 0.59978 25.2506C0.164751 24.7744 -0.0501556 24.1335 0.0099147 23.4923L1.71856 5.24314C1.74296 4.98108 1.96349 4.7809 2.22737 4.7809H18.7832C19.0471 4.7809 19.2676 4.98108 19.2922 5.24314L21.0009 23.4923Z"
                fill="#FF0000"
              />
            </svg>
            <span className="text-[24px] font-bold tracking-tight text-white">
              Quick<span className="text-red-600">Buy</span>
            </span>
          </Link>
          <p className="text-[11px] leading-relaxed tracking-[0.2em] text-gray-400 max-w-[280px] uppercase font-medium">
            Curating the world's most advanced electronics for the modern minimalist.
          </p>
        </div>

        {/* 2. CUSTOMER CARE LINKS (Center) */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-white">
            Customer Care
          </h3>
          <ul className="flex flex-col gap-3 text-[12px] text-gray-400 uppercase tracking-[0.1em] font-semibold">
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/support" className="hover:text-white transition-colors">Support Center</Link></li>
          </ul>
        </div>

        {/* 3. FOLLOW US & COPYRIGHT (Right) */}
        <div className="flex flex-col md:items-end gap-8">
          <div className="flex flex-col md:items-end gap-5">
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.3em] text-white">
              Follow Us
            </h3>
            <div className="flex gap-6 text-gray-400">
               {/* Minimalist Social Icons */}
               <button className="hover:text-white"><ShareIcon /></button>
               <button className="hover:text-white"><GlobeIcon /></button>
               <button className="hover:text-white"><AtIcon /></button>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium md:text-right mt-4">
            © 2026  QuickBuy Electronics. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

// Minimalist Icons for Footer
function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
    </svg>
  );
}
