import React from 'react';

const Login: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-[440px]">
        
        {/* Header Section - Increased font size */}
        <div className="text-center mb-14">
          <h1 className="text-[48px] font-bold tracking-tight mb-2 leading-tight text-black">
            Login
          </h1>
          <p className="text-gray-500 text-[16px]">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email Field - Slightly larger label and input */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-black">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#f1f1f1] border-none text-[15px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
            />
          </div>

          {/* Password Field - Adjusted spacing */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-end">
              <label className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-black">
                Password
              </label>
              <a href="#" className="text-[11px] font-bold text-red-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#f1f1f1] border-none text-[15px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
            />
          </div>

          {/* Login Button - MUCH BIGGER & BOLDER */}
          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-white py-5 rounded-full text-[18px] font-bold mt-4 hover:bg-black transition-all active:scale-[0.98] shadow-sm"
          >
            Login
          </button>

          {/* Create Account Link - Larger text */}
          <div className="text-center text-[15px] mt-8 text-gray-600">
            New to QuickBuy?{' '}
            <a 
              href="#" 
              className="font-bold text-black border-b-[3px] border-red-600 pb-1 ml-1 inline-block hover:text-red-600 transition-colors"
            >
              Create Account
            </a>
          </div>
          
        </form>
      </div>
    </main>
  );
};
export default Login;