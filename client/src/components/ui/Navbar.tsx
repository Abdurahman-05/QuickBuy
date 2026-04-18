import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 flex flex-col items-center sticky top-0 z-50">
      <div className="flex h-[84px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
        
        {/* Logo */}
        <Logo />

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-10 lg:flex pl-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative text-[14px] tracking-wide transition-colors ${
                  isActive ? "text-black font-semibold" : "text-gray-500 font-medium hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-red-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3 md:gap-8">
          {/* Pill Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[44px] w-[200px] lg:w-[260px] rounded-full bg-[#f8f9fa] pl-11 pr-4 text-[13px] outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-gray-200 shadow-sm"
            />
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-6 text-black">
            <Link to="/cart" className="hover:text-red-500 transition-colors" aria-label="Cart">
              <CartIcon />
            </Link>
            <Link to="/wishlist" className="hover:text-red-500 transition-colors" aria-label="Wishlist">
              <HeartIcon />
            </Link>
            <Link to="/profile" className="hover:text-red-500 transition-colors" aria-label="Profile">
              <ProfileIcon />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-[#1B1B1B] shadow-sm transition-transform duration-200 hover:scale-[1.03] lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="w-full bg-white border-t border-gray-100 lg:hidden py-6 px-6 shadow-xl">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex h-12 items-center rounded-xl px-4 text-[16px] font-medium transition-colors ${
                    isActive ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 md:hidden">
            <form onSubmit={handleSearch} className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-full bg-gray-50 pl-11 pr-4 text-[14px] outline-none"
              />
            </form>
          </div>
        </div>
      )}
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

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0Z" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 18.35L8.55 17.05C6.86667 15.5333 5.475 14.225 4.375 13.125C3.275 12.025 2.4 11.0375 1.75 10.1625C1.1 9.2875 0.645833 8.48333 0.3875 7.75C0.129167 7.01667 0 6.26667 0 5.5C0 3.93333 0.525 2.625 1.575 1.575C2.625 0.525 3.93333 0 5.5 0C6.36667 0 7.19167 0.183333 7.975 0.55C8.75833 0.916667 9.43333 1.43333 10 2.1C10.5667 1.43333 11.2417 0.916667 12.025 0.55C12.8083 0.183333 13.6333 0 14.5 0C16.0667 0 17.375 0.525 18.425 1.575C19.475 2.625 20 3.93333 20 5.5C20 6.26667 19.8708 7.01667 19.6125 7.75C19.3542 8.48333 18.9 9.2875 18.25 10.1625C17.6 11.0375 16.725 12.025 15.625 13.125C14.525 14.225 13.1333 15.5333 11.45 17.05L10 18.35ZM10 15.65C11.6 14.2167 12.9167 12.9875 13.95 11.9625C14.9833 10.9375 15.8 10.0458 16.4 9.2875C17 8.52917 17.4167 7.85417 17.65 7.2625C17.8833 6.67083 18 6.08333 18 5.5C18 4.5 17.6667 3.66667 17 3C16.3333 2.33333 15.5 2 14.5 2C13.7167 2 12.9917 2.22083 12.325 2.6625C11.6583 3.10417 11.2 3.66667 10.95 4.35H9.05C8.8 3.66667 8.34167 3.10417 7.675 2.6625C7.00833 2.22083 6.28333 2 5.5 2C4.5 2 3.66667 2.33333 3 3C2.33333 3.66667 2 4.5 2 5.5C2 6.08333 2.11667 6.67083 2.35 7.2625C2.58333 7.85417 3 8.52917 3.6 9.2875C4.2 10.0458 5.01667 10.9375 6.05 11.9625C7.08333 12.9875 8.4 14.2167 10 15.65Z" fill="currentColor" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M25.9507 24.31C26.6685 24.31 27.3867 24.6177 27.8995 25.1305C28.4124 25.6433 28.7201 26.3615 28.7201 27.1821C28.7201 28.7206 27.4891 29.9516 25.9506 29.9516C25.13 29.9516 24.4121 29.6438 23.899 29.131C23.3862 28.6182 23.0785 27.9 23.0785 27.1821C23.0785 26.3616 23.3862 25.6436 23.899 25.1306C24.4119 24.6178 25.13 24.31 25.9506 24.31L25.9507 24.31ZM15.3856 13.3347C14.7701 13.3347 14.36 12.8219 14.36 12.2064C14.36 11.5909 14.7704 11.0781 15.3856 11.0781H23.2839C23.8993 11.0781 24.4122 11.5909 24.4122 12.2064C24.4122 12.8219 23.8993 13.3347 23.2839 13.3347H15.3856ZM31.1821 5.4365C31.2847 4.82101 31.9 4.41086 32.5155 4.51327C33.131 4.61594 33.5411 5.23115 33.4387 5.84668L30.7719 21.1301C30.6692 21.7456 30.054 22.0533 29.5409 22.0533H9.12896C8.51347 22.0533 8.10332 21.5405 8.00064 21.1301L4.71836 2.25664H1.12832C0.512827 2.25664 0 1.74381 0 1.12832C0 0.512827 0.512827 0 1.12832 0H5.64159C6.15442 0 6.66723 0.410416 6.76991 0.92323L10.0522 19.7967L28.7206 19.8994L31.1823 5.4363L31.1821 5.4365ZM12.8217 24.31C13.6422 24.31 14.2578 24.6177 14.7706 25.1305C15.2834 25.6433 15.5911 26.3615 15.5911 27.1821C15.5911 28.7206 14.3601 29.9516 12.8216 29.9516C12.1037 29.9516 11.3855 29.6438 10.8727 29.131C10.3599 28.6182 10.0522 27.9 10.0522 27.1821C10.0522 26.3616 10.3599 25.6436 10.8727 25.1306C11.3856 24.6178 12.0011 24.31 12.8216 24.31L12.8217 24.31Z" fill="currentColor" />
    </svg>
  );
}
