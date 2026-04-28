import { useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react"
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Profile Overview",
  "/dashboard/orders": "My Orders",
  "/dashboard/wishlist": "My Wishlist",
  "/dashboard/addresses": "Shipping Addresses",
  "/dashboard/settings": "Account Settings",
};

interface DashboardTopbarProps {
  onMenuToggle?: () => void;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => setSearchQuery("");

  // Custom logic for titles to ensure they feel premium
  const currentPath = location.pathname;
  const pageTitle = pageTitles[currentPath] || "Dashboard";

  return (
    <header className="h-16 bg-white/60 backdrop-blur-xl border-b border-gray-100/80 flex items-center justify-between px-4 sm:px-6 lg:px-10 fixed top-0 left-0 lg:left-[260px] right-0 z-40 transition-all duration-500">

      {/* LEFT: Menu Toggle (Mobile) + Dynamic Title */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <button
          className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gray-50/50 hover:bg-gray-100 text-gray-900 transition-all active:scale-95 flex-shrink-0"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col min-w-0">
          <h2 className="text-[13px] sm:text-[16px] md:text-[18px] font-black text-gray-900 tracking-tight uppercase truncate">
            {pageTitle}
          </h2>
          <div className="h-[2px] sm:h-[3px] w-6 sm:w-8 bg-red-600 rounded-full mt-0.5 animate-in slide-in-from-left duration-700" />
        </div>
      </div>

      {/* CENTER: Stunning Global Search */}
      <div className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-8 group">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-focus-within:scale-110">
            <Search
              size={16}
              className="text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none"
            />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Explore products, orders, settings..."
            className="w-full h-10 pl-11 pr-10 bg-gray-100/50 border border-transparent rounded-[14px] text-[13px] font-medium transition-all duration-300 focus:outline-none focus:ring-[6px] focus:ring-red-600/5 focus:border-red-600/20 focus:bg-white focus:shadow-sm placeholder:text-gray-400 group-hover:bg-gray-100"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-lg bg-gray-200/50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all animate-in zoom-in-50 duration-200"
            >
              <X size={12} strokeWidth={3} />
            </button>
          )}
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0" />
    </header>
  );
};

export default DashboardTopbar;
