import React from "react";

const ProfileInfoForm: React.FC = () => {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* First Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            First Name
          </label>
          <input
            type="text"
            placeholder="Alex"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Rivera"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="alex.rivera@example.com"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-600 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>

      </div>
    </form>
  );
};

export default ProfileInfoForm;
