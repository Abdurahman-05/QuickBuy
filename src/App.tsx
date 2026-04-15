import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "@/pages/Dashboard"
import AddProduct from "@/pages/AddProduct"
import Users from "@/pages/Users"


export default function App() {
  return (

    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetail" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<AddProduct />} />
          <Route path="/users" element={<Users />} />

        </Routes>
      </div>
      <Footer />
    </div>



  );
}
