import React from 'react';

const Login: React.FC = () => {
  return (
    // We removed Navbar from here because it's now in App.tsx
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[42px] font-bold tracking-tight mb-2">Login</h1>
          <p className="text-gray-500 text-[15px]">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form className="flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-black">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#f1f1f1] border-none text-sm rounded-[10px] px-5 py-4 outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-black">
                Password
              </label>
              <a href="#" className="text-[10px] font-bold text-red-600">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#f1f1f1] border-none text-sm rounded-[10px] px-5 py-4 outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#1a1a1a] text-white py-4.5 rounded-full text-[16px] font-bold mt-4 hover:bg-black transition-all active:scale-[0.98]"
          >
            Login
          </button>

          {/* Create Account Link */}
          <div className="text-center text-[13px] mt-6 text-gray-600">
            New to QuickBuy?{' '}
            <a 
              href="#" 
              className="font-bold text-black border-b-[3px] border-red-600 pb-0.5 ml-1 inline-block"
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