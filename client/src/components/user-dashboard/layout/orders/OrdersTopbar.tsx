import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "PROFILE OVERVIEW",
  "/dashboard/orders": "MY ORDERS",
  "/dashboard/wishlist": "WISHLIST",
  "/dashboard/addresses": "SHIPPING ADDRESSES",
  "/dashboard/settings": "ACCOUNT SETTINGS",
};

interface OrdersTopbarProps {
  onMenuToggle?: () => void;
}

const OrdersTopbar: React.FC<OrdersTopbarProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const pageTitle = pageTitles[location.pathname] || "DASHBOARD";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex mt-1 items-center justify-between px-5 lg:px-8 fixed top-0 left-0 lg:left-[220px] right-0 z-40">

      {/* LEFT: Page Title & Menu */}
      <div className="flex gap-4 lg:gap-5 ml-2 lg:ml-4 items-center">
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
        >
          <Menu size={20} className="text-gray-700" strokeWidth={2} />
        </button>
        <h2 className="text-lg font-extrabold text-red-600 tracking-wider uppercase whitespace-nowrap">
          {pageTitle}
        </h2>

        {/* CENTER: Search (hidden on small screens) */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders by ID or product..."
              className="h-9 w-full pl-10 pr-4 lg:pr-20 text-sm bg-gray-100 border border-gray-200/60 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 focus:bg-white transition-all"
            />
          </div>
        </form>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <Link 
          to="/dashboard/settings"
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={17} className="text-gray-500" strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Link>

        {/* User Dropdown */}
        <Link 
          to="/dashboard"
          className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            Alex Rivera
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </Link>
      </div>

    </header>
  );
};

export default OrdersTopbar;