import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5] overflow-x-hidden w-full relative">
      <Navbar />
      <div 
        key={pathname}
        className="flex-grow animate-page-entry"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}