import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Imports from the /components/ui/ folder
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

// 2. Imports from the /pages/ folder
import Cart from './pages/cart';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* These now work because we imported them above */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Matches http://localhost:5179/cart */}
          <Route path="/cart" element={<Cart />} />
          
          {/* Matches http://localhost:5179/ (Home page) */}
          <Route path="/" element={<Home />} />

          {/* Matches http://localhost:5179/login */}
          <Route path="/login" element={<Login />} />

          {/* If they type a wrong URL, go to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;