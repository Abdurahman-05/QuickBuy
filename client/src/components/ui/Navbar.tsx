import { useState } from "react";
import { Link } from "react-router-dom";

type NavItem = "Home" | "Products" | "Categories" | "About";

const NAV_ITEMS: NavItem[] = ["Home", "Products", "Categories", "About"];

export default function Navbar() {
  const [selectedNav, setSelectedNav] = useState<NavItem>("Products");

  return (
    <header className="w-full bg-white border-b border-gray-100 flex justify-center sticky top-0 z-50">
      <div className="flex h-[84px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
        
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <nav className="hidden items-center gap-10 lg:flex pl-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedNav(item)}
              className={`relative text-[14px] tracking-wide transition-colors ${
                selectedNav === item ? "text-black font-semibold" : "text-gray-500 font-medium hover:text-black"
              }`}
            >
              {item}
              {selectedNav === item && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-8">
          {/* Pill Search Bar */}
          <div className="relative hidden md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="h-[44px] w-[260px] rounded-full bg-[#f8f9fa] pl-11 pr-4 text-[13px] outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-gray-200 shadow-sm"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6 text-black">
            <button className="hover:text-red-500 transition-colors"><CartIcon /></button>
            <button className="hover:text-red-500 transition-colors"><HeartIcon /></button>
            <button className="hover:text-red-500 transition-colors"><ProfileIcon /></button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 23.5C21.1 24.1 20.8 24.8 20.4 25.3C20 25.7 19.4 26 18.7 26H2.3C1.6 26 1 25.7 0.6 25.3C0.2 24.8 -0.1 24.1 0 23.5L1.7 5.2C1.7 5 2 4.8 2.2 4.8H18.8C19 4.8 19.3 5 19.3 5.2L21 23.5Z" fill="#F42929"/>
        <path d="M7 5.5V4C7 2.067 8.567 0.5 10.5 0.5C12.433 0.5 14 2.067 14 4V5.5" stroke="#F42929" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span className="text-[22px] font-bold tracking-tight text-black">
        QuickBuy
      </span>
    </Link>
  );
}

// Icons
function SearchIcon() { return <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="8" r="6"/><line x1="12" y1="12" x2="16" y2="16"/></svg>; }
function CartIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>; }
function HeartIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>; }
function ProfileIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
