import React from "react";

const SecurityForm: React.FC = () => {
  return (
    <form className="space-y-5">

      {/* Current Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
          Current Password
        </label>
        <input
          type="password"
          placeholder="********"
          className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="New password"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full h-11 px-4 bg-gray-200/60 border-transparent rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-gray-300 focus:ring-0 transition-colors"
          />
        </div>
      </div>

    </form>
  );
};

export default SecurityForm;
