import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CircleUser,
  ShoppingBag,
  Heart,
  Truck,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface OrdersSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const OrdersSidebar: React.FC<OrdersSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: "Profile Overview", path: "/dashboard", icon: CircleUser, end: true },
    { name: "My Orders", path: "/dashboard/orders", icon: ShoppingBag },
    { name: "Wishlist", path: "/dashboard/wishlist", icon: Heart },
    { name: "Shipping Addresses", path: "/dashboard/addresses", icon: Truck },
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
        className={`w-[260px] fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:flex`}
      >
        {/* Mobile Close Button */}
        <button
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-10 pt-6 pb-2 mt-5">
          <Link to="/" className="text-xl font-semibold text-red-500 tracking-tight block ml-4 lg:ml-0">
            QuickBuy
          </Link>
        </div>

        {/* User Card */}
        <div className="px-7 mt-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Premium Member</p>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              Account Active
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0 px-6 mt-5 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-[10px] text-[13px] font-medium rounded-lg transition-colors duration-200 ${isActive
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={17}
                    strokeWidth={isActive ? 2.2 : 1.7}
                    className={isActive ? "text-red-500" : "text-gray-400"}
                  />

                  <span className={isActive ? "font-semibold" : ""}>
                    {item.name}
                  </span>

                  {/* Active underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-red-500 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

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
      </aside>
    </>
  );
};

export default OrdersSidebar;