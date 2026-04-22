import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CircleUser,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface ProfileSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: "Profile Overview", path: "/dashboard", icon: CircleUser, end: true },
    { name: "My Orders", path: "/dashboard/orders", icon: ShoppingBag },
    { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
    { name: "Shipping Addresses", path: "/dashboard/addresses", icon: MapPin },
    { name: "Account Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar (Desktop fixed, Mobile offcanvas) */}
      <aside
        className={`w-64 fixed left-0 top-0 bottom-0 bg-white flex-col pt-14 lg:pt-8 pb-6 pl-6 pr-4 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:flex lg:w-56 lg:top-14`}
      >
        {/* Mobile Close Button */}
        <button
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 mt-8 lg:mt-0 h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-0 py-3 text-[15px] font-medium transition-colors duration-200 ${isActive
                  ? "text-red-500"
                  : "text-gray-400 hover:text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? "text-red-500" : "text-gray-400"}
                  />

                  <span className={isActive ? "font-semibold" : ""}>
                    {item.name}
                  </span>

                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-0 right-0 h-[2px] bg-red-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Sign Out */}
          <div className="px-4 pb-6 mt-auto">
            <Link
              to="/login"
              className="flex items-center gap-3 px-3 py-[10px] text-[13px] font-medium text-gray-400 hover:text-gray-700 transition-colors duration-200 w-full rounded-lg hover:bg-gray-50/50"
            >
              <LogOut size={17} strokeWidth={1.7} />
              Sign Out
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default ProfileSidebar;
