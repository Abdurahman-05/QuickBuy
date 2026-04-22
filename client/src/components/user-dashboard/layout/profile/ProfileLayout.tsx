import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTopbar from "./ProfileTopbar";

const ProfileLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F8] font-sans text-gray-900">

      {/* Topbar */}
      <ProfileTopbar onMenuToggle={() => setIsMobileMenuOpen(true)} />

      {/* Sidebar */}
      <ProfileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="pt-14 lg:pl-56 min-h-screen">
        <div className="p-5 md:p-8 lg:p-10 max-w-[1100px] pb-10">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default ProfileLayout;
