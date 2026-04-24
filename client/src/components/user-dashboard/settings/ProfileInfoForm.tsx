import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ProfileInfoForm: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const successMessage = useAuthStore((state) => state.successMessage);
  const clearError = useAuthStore((state) => state.clearError);
  const clearSuccessMessage = useAuthStore((state) => state.clearSuccessMessage);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
      setPreviewUrl(user.profileImage || null);
    }
  }, [user]);

  useEffect(() => {
    if (!successMessage) return;

    const timeout = setTimeout(() => {
      clearSuccessMessage();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [successMessage, clearSuccessMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
    if (successMessage) clearSuccessMessage();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (error) clearError();
      if (successMessage) clearSuccessMessage();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    if (selectedFile) {
      data.append("profileImage", selectedFile);
    }

    try {
      await updateProfile(data);
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Messages */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm animate-in fade-in slide-in-from-top-1">
          <CheckCircle size={18} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Profile Image Preview & Upload */}
        <div className="flex items-center gap-6 pb-2">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden border-2 border-gray-200">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">
                  {formData.firstName[0]}{formData.lastName[0]}
                </div>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              <span className="text-[10px] font-black uppercase tracking-widest">Change</span>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-gray-900">Profile Picture</h4>
            <p className="text-[11px] text-gray-400 font-medium">PNG or JPG, Max 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full h-11 px-4 bg-gray-100 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full h-11 px-4 bg-gray-100 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full h-11 px-4 bg-gray-100 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full h-11 px-4 bg-gray-100 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-10 py-4 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-900 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
