import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <main className="flex-1 w-full bg-white flex flex-col items-center justify-center px-6 py-20 min-h-[80vh]">
      <div className="w-full max-w-[440px]">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-[50px] font-bold tracking-tight mb-2 leading-tight text-black">
            Login
          </h1>
          <p className="text-gray-500 text-[17px]">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all" 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-end">
              <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
                Password
              </label>
              <a href="#" className="text-[12px] font-bold text-red-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-5 rounded-full text-[19px] font-bold hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-sm"
          >
            Login
          </button>
        </form>

        {/* Create Account Link */}
        <div className="text-center text-[16px] mt-8 text-gray-600">
          New to QuickBuy?{' '}
          <Link 
            to="/signup" 
            className="font-bold text-black border-b-[3px] border-red-600 pb-1 ml-1 inline-block hover:text-red-600 transition-colors"
          >
            Create Account
          </Link>
        </div>
        
      </div>
    </main>
  );
};

export default Login;