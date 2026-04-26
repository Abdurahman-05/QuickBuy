import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccessMessage = useAuthStore((state) => state.clearSuccessMessage);
  
  const navigate = useNavigate();

  useEffect(() => {
    // REMOVED unmount clearing to allow errors to persist
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) clearError();
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword || password.length < 6) return;
    
    try {
      if (token) {
        await resetPassword(token, password);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      // Error handled in store
    }
  };

  const isValid = password.length >= 6 && password === confirmPassword;

  return (
    <main className="flex-1 w-full bg-white flex flex-col items-center justify-center px-6 py-20 min-h-[80vh]">
      <div className="w-full max-w-[440px]">
        
        <div className="text-center mb-14">
          <h1 className="text-[40px] font-bold tracking-tight mb-4 leading-tight text-black">
            New Password
          </h1>
          <p className="text-gray-500 text-[17px]">
            Please enter your new password below.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1 text-center font-bold">
            {successMessage} Redirection to home...
          </div>
        )}

        {!successMessage && (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            <div className="flex flex-col gap-2.5">
              <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
                New Password (min 6 chars)
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[12px] font-extrabold tracking-[0.2em] uppercase text-black">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="w-full bg-[#f5f5f5] border-none text-[16px] rounded-[12px] px-6 py-5 outline-none placeholder:text-gray-400 focus:bg-[#ebebeb] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full bg-black text-white py-5 rounded-full text-[19px] font-bold hover:bg-[#1a1a1a] transition-all active:scale-[0.98] shadow-sm disabled:opacity-30 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
