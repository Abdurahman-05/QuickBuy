import React from "react";
import { Link } from "react-router-dom";
import { User, ShoppingCart, Menu } from "lucide-react";

interface ProfileTopbarProps {
  onMenuToggle?: () => void;
}

const ProfileTopbar: React.FC<ProfileTopbarProps> = ({ onMenuToggle }) => {
  return (
    <header className="h-14 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 lg:px-10 fixed top-0 left-0 right-0 z-50">

      {/* LEFT: BRAND & MENU */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle Menu"
        >
          <Menu size={20} className="text-gray-700" strokeWidth={2} />
        </button>

        <Link to="/" className="flex items-center">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            QuickBuy
          </span>
        </Link>
      </div>

      {/* CENTER NAV */}
      <nav className="hidden md:flex items-center gap-7">
        {["Home", "Products", "Categories", "About"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-2">
        <Link
          to="/dashboard"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/80 transition-colors duration-200"
          aria-label="User profile"
        >
          <User size={18} className="text-gray-700" strokeWidth={1.8} />
        </Link>

        <Link
          to="/cart"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100/80 transition-colors duration-200 relative"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={18} className="text-gray-700" strokeWidth={1.8} />
        </Link>
      </div>

    </header>
  );
};

export default ProfileTopbar;
