import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccessMessage = useAuthStore((state) => state.clearSuccessMessage);

  // Debugging: Log state changes
  console.log("[ForgotPassword UI] error state:", error);
  console.log("[ForgotPassword UI] successMessage state:", successMessage);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await forgotPassword(email);
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <main className="flex-1 w-full bg-white flex flex-col items-center justify-center px-6 py-20 min-h-[80vh]">
      <div className="w-full max-w-[440px]">
        
        <div className="text-center mb-14">
          <h1 className="text-[40px] font-bold tracking-tight mb-4 leading-tight text-black">
            Reset Password
          </h1>
          <p className="text-gray-500 text-[17px]">
            {successMessage 
              ? successMessage
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1 text-center">
            {successMessage}
          </div>
        )}

        {!successMessage ? (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-black text-white py-5 rounded-full text-[19px] font-bold hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-sm disabled:opacity-30 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-[14px] font-bold text-gray-400 hover:text-black transition-colors">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center mt-8">
            <Link 
              to="/login" 
              className="w-full inline-block bg-black text-white py-5 rounded-full text-[19px] font-bold hover:bg-[#1a1a1a] transition-all shadow-sm"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
