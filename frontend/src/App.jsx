import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

// Note: This is an inline placeholder for the Navbar.
// When you copy this file, you can simply use: import Navbar from './components/Navbar';
// We added the text-qb-red specifically inside here as requested!
const Navbar = () => (
  <header className="w-full max-w-6xl flex justify-between items-center py-6 px-8">
    <div className="text-xl font-extrabold tracking-tight text-qb-red">QuickBuy</div>
  </header>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-sans text-qb-textDark">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-3">Login</h1>
        <p className="text-qb-textLight text-sm mb-10">Welcome back. Please enter your details.</p>

        <form className="w-full max-w-sm flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest text-qb-textDark uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-qb-gray text-sm rounded-md px-4 py-3 placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold tracking-widest text-qb-textDark uppercase">
                Password
              </label>
              <a href="#" className="text-[11px] font-bold text-qb-red hover:underline">
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-qb-gray text-sm rounded-md px-4 py-3 placeholder:text-gray-400 tracking-widest"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-qb-black text-white py-3.5 rounded-full font-medium text-sm mt-3 hover:bg-black transition-colors shadow-sm"
          >
            Login
          </button>

          {/* Create Account Link */}
          <div className="text-center mt-3 text-xs text-qb-textLight font-medium">
            New to QuickBuy?{' '}
            <a href="#" className="text-qb-textDark font-bold hover:opacity-80 transition-opacity" style={{ textDecoration: 'underline decoration-1 underline-offset-4 decoration-qb-red' }}>
              Create Account
            </a>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full bg-qb-gray py-8 px-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-qb-red font-bold text-sm tracking-tight">QuickBuy</h2>
            <p className="text-[11px] text-gray-500 font-medium">
              © 2024 QuickBuy Curator. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 text-[11px] font-medium text-gray-500">
            <a href="#" className="hover:text-qb-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-qb-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-qb-black transition-colors">Shipping</a>
            <a href="#" className="hover:text-qb-black transition-colors">Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
