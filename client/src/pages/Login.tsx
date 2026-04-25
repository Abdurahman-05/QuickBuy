import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccessMessage = useAuthStore((state) => state.clearSuccessMessage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname;

  useEffect(() => {
    console.log("[Login UI] UI ERROR UPDATED:", error);
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (from) {
        const fromIsAdmin = from.startsWith("/admin");
        if (user.role === "ADMIN" && fromIsAdmin) {
          console.log("[Login UI] AUTH SUCCESS - Redirecting to:", from);
          navigate(from, { replace: true });
          return;
        }
        if (user.role !== "ADMIN" && !fromIsAdmin) {
          console.log("[Login UI] AUTH SUCCESS - Redirecting to:", from);
          navigate(from, { replace: true });
          return;
        }
      }
      if (user.role === "ADMIN") {
        console.log("[Login UI] AUTH SUCCESS - Redirecting to Admin Dashboard");
        navigate("/admin/dashboard", { replace: true });
      } else {
        console.log("[Login UI] AUTH SUCCESS - Redirecting to User Dashboard");
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      // Store already handles clearing previous messages at start
      await login({ email, password });
    } catch (err) {
      // Error is handled in the store
    }
  };

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {successMessage}
          </div>
        )}

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all" 
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-end">
              <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
                Password
              </label>
              <Link to="/forgot-password" title="Forgot Password" className="text-[12px] font-bold text-red-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full bg-black text-white py-5 rounded-full text-[19px] font-bold hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : "Login"}
          </button>
        </form>

        {/* Create Account Link */}
        <div className="text-center text-[16px] mt-8 text-gray-600">
          New to QuickBuy?{' '}
          <Link 
            to="/register" 
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