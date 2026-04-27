import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import api from '../lib/axios';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, X } from "lucide-react";

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
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

      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className="w-12 h-[1px] bg-gray-300"></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">{error}</div>}
        {successMessage && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm font-medium">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Profile Image Circle Uploader */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-black transition-colors cursor-pointer">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-xs text-center">Click to add photo</div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
                      }
                    }} 
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">Profile Picture (Optional)</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name" className="p-4 bg-gray-100 rounded-lg outline-none w-full focus:bg-gray-200 transition-colors" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" className="p-4 bg-gray-100 rounded-lg outline-none w-full focus:bg-gray-200 transition-colors" value={formData.lastName} onChange={handleChange} required />
              </div>
              <input name="email" type="email" placeholder="Email Address" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors" value={formData.phone} onChange={handleChange} />
              <button type="button" onClick={() => setStep(2)} disabled={!isStep1Valid} className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-30">NEXT →</button>
            </>
          ) : (
            <>
<div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4 shadow-[0_10px_25px_-20px_rgba(0,0,0,0.45)]">
  <div className="flex items-center">
    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400">
      Security & profile
    </p>
  </div>
  <p className="text-sm text-gray-600">
    Set your password and add a profile image to personalize your account.
  </p>
</div>

<input
  name="password"
  type="password"
  placeholder="Password (min 6 chars)"
  className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors"
  value={formData.password}
  onChange={handleChange}
  required
/>

<input
  name="confirmPassword"
  type="password"
  placeholder="Confirm Password"
  className="w-full p-4 bg-gray-100 rounded-lg outline-none focus:bg-gray-200 transition-colors"
  value={formData.confirmPassword}
  onChange={handleChange}
  required
/>

<label
  onDragOver={(e) => {
    e.preventDefault();
    setIsDragging(true);
  }}
  onDragLeave={() => setIsDragging(false)}
  onDrop={onDrop}
  className={`group relative block w-full overflow-hidden rounded-2xl border p-0.5 cursor-pointer transition-all duration-300 ${
    isDragging
      ? "border-black shadow-[0_14px_38px_-18px_rgba(0,0,0,0.5)] scale-[1.01]"
      : "border-gray-200 hover:border-gray-300 hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]"
  }`}
>
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={async (e) => handleFileSelect(e.target.files?.[0])}
  />

  <div
    className={`relative rounded-[15px] bg-gradient-to-br from-white via-white to-gray-50 px-4 py-4 sm:px-5 sm:py-5 ${
      isDragging ? "ring-2 ring-black/10" : ""
    }`}
  >
    <div className="absolute -top-8 -right-6 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl" />
    <div className="absolute -bottom-8 -left-6 h-20 w-20 rounded-full bg-black/[0.04] blur-2xl" />

    <div className="relative flex items-start sm:items-center gap-3 sm:gap-4">
      <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-black text-white flex items-center justify-center shadow-sm shrink-0">
        {isUploadingImage ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <UploadCloud className="w-5 h-5" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-tight">
          {isUploadingImage
            ? "Uploading profile image..."
            : "Upload profile image"}
        </p>

        <p className="text-xs sm:text-[13px] text-gray-500 mt-1 leading-relaxed">
          Drag and drop image here, or tap to browse.
        </p>

        <p className="text-[11px] text-gray-400 mt-2">
          PNG / JPG recommended
        </p>
      </div>
    </div>

    {(imagePreview || formData.profileImage) && (
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 sm:p-3">
        <img
          src={imagePreview || formData.profileImage}
          alt="Profile preview"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover border border-gray-200"
        />

        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
            {isUploadingImage
              ? "Processing image..."
              : "Profile image ready"}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Uploaded and linked to registration
          </div>
        </div>

        {!isUploadingImage && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              clearUploadedImage();
            }}
            className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors flex items-center justify-center"
            aria-label="Remove uploaded image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    )}

    {!imagePreview &&
      !formData.profileImage &&
      !isUploadingImage && (
        <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-400">
          <ImageIcon className="w-3.5 h-3.5" />
          Optional, but helps personalize your account.
        </div>
      )}
  </div>
</label>

<button
  type="submit"
  disabled={isLoading || !isStep2Valid || isUploadingImage}
  className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {isLoading ? (
    <>
      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      CREATING ACCOUNT...
    </>
  ) : (
    "CREATE ACCOUNT"
  )}
</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 underline mt-4">← Back</button>
            </>
          )}
          <p className="text-center text-sm mt-6 text-gray-600">Already have an account? <Link to="/login" className="font-bold underline text-black">Login</Link></p>
        </form>
      </section>
    </div>
  );
}