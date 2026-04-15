import { Routes, Route } from "react-router-dom";
import "./App.css";

// Fixed imports for the UI folder
import Footer from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";

// Page imports
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import UserProfilePage from "./pages/UserProfilePage";
import Login from "./pages/Login";
import OrderConfirmation from "./pages/Orderconformation"; // Fixed exact spelling of file on disk

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetail" element={<ProductDetails />} />
          <Route path="/profile" element={<UserProfilePage />} />
          
          {/* Your New Login Route */}
          <Route path="/login" element={<Login />} />
          
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}