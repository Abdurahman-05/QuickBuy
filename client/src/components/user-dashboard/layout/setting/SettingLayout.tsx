import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import OrdersSidebar from "../orders/OrdersSidebar";
import SettingTopNavbar from "./SettingTopbar"

const SettingLayout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F7F7F8] font-sans text-gray-900">

            {/* Sidebar */}
            <OrdersSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* Topbar */}
            <SettingTopNavbar onMenuToggle={() => setIsMobileMenuOpen(true)} />

            {/* Main Content */}
            <main className="pt-14 lg:pl-[270px] min-h-screen">
                <div className="p-5 md:p-8 lg:p-10 max-w-[1100px] pb-10">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default SettingLayout;