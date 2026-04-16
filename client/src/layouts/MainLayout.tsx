import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}