import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

/**
 * Unified Dashboard Layout
 * Provides a consistent, smooth experience across all user account sectors.
 * Uses a single fixed sidebar and topbar to prevent re-mounting lag during navigation.
 */
const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-gray-900 selection:bg-red-50 selection:text-red-600">
      
      {/* Sidebar - Fixed on Desktop */}
      <DashboardSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Topbar - Glassmorphism & Dynamic Titles */}
      <DashboardTopbar 
        onMenuToggle={() => setIsMobileMenuOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="pt-16 lg:pl-[260px] min-h-screen transition-all duration-500 ease-in-out">
        <div className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 md:py-10 max-w-[1400px] mx-auto pb-20">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;
