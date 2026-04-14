import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register"; // 1. Import your new page

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetail" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} /> {/* 2. Add the route */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}