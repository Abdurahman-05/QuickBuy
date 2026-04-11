import React from 'react';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white font-sans text-qb-textDark">
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-3">Login</h1>
        <p className="text-qb-textLight text-sm mb-10">
          Welcome back. Please enter your details.
        </p>

        <form className="w-full max-w-sm flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-qb-gray text-sm rounded-md px-4 py-3"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold tracking-widest uppercase">
                Password
              </label>
              <a href="#" className="text-[11px] font-bold text-qb-red">
                Forget Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-qb-gray text-sm rounded-md px-4 py-3"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            className="w-full bg-qb-black text-white py-3.5 rounded-full text-sm mt-3"
          >
            Login
          </button>

          <div className="text-center text-xs mt-3">
            New to QuickBuy?{' '}
            <a href="#" className="font-bold underline">
              Create Account
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;