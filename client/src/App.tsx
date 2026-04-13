import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";


export default function App() {
  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
      
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
