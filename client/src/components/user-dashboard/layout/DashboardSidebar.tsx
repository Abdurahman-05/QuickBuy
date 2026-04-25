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
import { useAuthStore } from "../../../store/useAuthStore";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const userInitials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "U";

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
          <Link to="/" className="text-xl font-black text-black tracking-tighter block ml-4 lg:ml-0 group">
            Quick<span className="text-red-600 group-hover:text-red-500 transition-colors">Buy</span>
          </Link>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 ml-4 lg:ml-0">
            User Center
          </p>
        </div>

        {/* User Card */}
        <div className="px-7 mt-8 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 shadow-sm">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
                {userInitials}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-900 truncate">{fullName}</p>
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Member
                </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-6 mt-8 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-[12px] text-[13px] font-medium rounded-xl transition-all duration-300 ${isActive
                  ? "text-gray-900 bg-gray-50 shadow-sm"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={isActive ? "text-red-600" : "text-gray-400"}
                  />

                  <span className={isActive ? "font-bold" : ""}>
                    {item.name}
                  </span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="absolute left-0 w-1 h-5 bg-red-600 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <div className="px-6 pb-8 mt-auto">
          <Link 
            to="/login"
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-gray-400 hover:text-red-600 hover:bg-red-50/50 transition-all duration-300 w-full rounded-xl"
          >
            <LogOut size={18} strokeWidth={2} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
