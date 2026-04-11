import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./page/login";

export default function App() {
  return (
    // 'flex flex-col min-h-screen' keeps the footer at the very bottom
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Navbar stays at the top */}
      <Navbar />

      {/* 2. Login page stays in the middle and grows to fill space */}
      <main className="flex-grow flex items-center justify-center">
        <Login />
      </main>

      {/* 3. Footer stays at the bottom */}
      <Footer />
      
    </div>
  );
}