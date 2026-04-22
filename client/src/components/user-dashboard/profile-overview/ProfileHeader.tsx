import React from "react";

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-5 sm:gap-6 mb-2">

      {/* Avatar with gradient ring */}
      <div className="relative flex-shrink-0">
        {/* Gradient border ring */}
        <div
          className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-full p-[3px]"
          style={{
            background: "linear-gradient(135deg, #FF8A00, #E53935, #C62828)",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Alex Johnson"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight leading-tight truncate">
          Alex Rivera
        </h1>

        <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-1.5 font-medium">
          Member since 2023
          <span className="inline-block w-[4px] h-[4px] bg-red-400 rounded-full" />
          Alex@example.com
        </p>
      </div>

    </div>
  );
};

export default ProfileHeader;