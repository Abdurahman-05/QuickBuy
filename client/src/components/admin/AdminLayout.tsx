import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  HelpCircle, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex">
        {/* Top of Sidebar */}
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-8 border-b border-gray-100">
            <span className="text-red-500 font-bold text-xl tracking-tighter">QuickBuy</span>
          </div>

          {/* Main Navigation */}
          <nav className="p-4 space-y-1">
            <NavLink 
              to="/admin"
              end
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <LayoutDashboard size={18} />
              DASHBOARD
            </NavLink>
            <NavLink 
              to="/admin/products"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <Package size={18} />
              PRODUCTS
            </NavLink>
            <NavLink 
              to="/admin/orders"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <ShoppingCart size={18} />
              ORDERS
            </NavLink>
            <NavLink 
              to="/admin/users"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-black' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <Users size={18} />
              USERS
            </NavLink>

            {/* New Entry Button */}
            <div className="pt-6 pb-2 px-4">
               <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 rounded-full text-xs font-semibold hover:bg-gray-800 transition-colors">
                 <Plus size={14} /> NEW ENTRY
               </button>
            </div>
          </nav>
        </div>

        {/* Bottom of Sidebar */}
        <div className="p-4 space-y-1">
          <NavLink 
              to="/admin/support"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <HelpCircle size={18} />
              SUPPORT
          </NavLink>
          <NavLink 
              to="/admin/settings"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <Settings size={18} />
              SETTINGS
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top App Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex-1"></div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" className="w-full h-full object-cover"/>
               </div>
               <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>
            <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition-colors ml-2">
              <LogOut size={14} /> LOGOUT
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
