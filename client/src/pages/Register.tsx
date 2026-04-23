import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '',
    profileImage: ''
  });
  
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccessMessage = useAuthStore((state) => state.clearSuccessMessage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    // REMOVED unmount clearing to allow errors to persist
  }, [isAuthenticated, navigate]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isStep1Valid = 
    formData.firstName.trim() !== '' && 
    formData.lastName.trim() !== '' && 
    validateEmail(formData.email);

  const isStep2Valid = 
    formData.password.length >= 6 && 
    formData.password === formData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (err) {
      // Error is handled in the store
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
      {/* Left Section - Matches Figma */}
      <section>
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Create Account</h1>
        <p className="text-gray-600 mb-10 text-lg">Join the circle of high-end technology enthusiasts.<br/>Experience curated excellence.</p>
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            PRIORITY MEMBER BENEFITS <span className="text-red-500">✓</span>
          </h3>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li>• Early access to limited drops</li>
            <li>• Concierge technical support</li>
            <li>• Exclusive editorial insights</li>
          </ul>
        </div>
      </section>

      {/* Right Section - The Form */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className="w-12 h-[1px] bg-gray-300"></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name" className="p-4 bg-gray-100 rounded-lg outline-none w-full focus:bg-gray-200 transition-colors" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" className="p-4 bg-gray-100 rounded-lg outline-none w-full focus:bg-gray-200 transition-colors" value={formData.lastName} onChange={handleChange} required />
              </div>
              <input name="email" type="email" placeholder="Email Address" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.phone} onChange={handleChange} />
              <input name="profileImage" placeholder="Profile Image URL (optional)" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.profileImage} onChange={handleChange} />
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                disabled={!isStep1Valid}
                className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                NEXT →
              </button>
            </>
          ) : (
            <>
              <input name="password" type="password" placeholder="Password (min 6 chars)" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.password} onChange={handleChange} required />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.confirmPassword} onChange={handleChange} required />
              <button 
                type="submit" 
                disabled={isLoading || !isStep2Valid} 
                className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    CREATING ACCOUNT...
                  </>
                ) : "CREATE ACCOUNT"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 underline mt-4 hover:text-black transition-colors">← Back</button>
            </>
          )}
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account? <Link to="/login" className="font-bold underline cursor-pointer text-black hover:text-red-600 transition-colors">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
}