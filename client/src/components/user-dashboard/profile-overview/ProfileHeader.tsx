import React from "react";
import { useAuthStore } from "../../../store/useAuthStore";

const ProfileHeader: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const joinedDate = user.createdAt 
    ? new Date(user.createdAt).getFullYear() 
    : "Recently";

  return (
    <div className="flex items-center gap-5 sm:gap-6 mb-2">

      {/* Avatar with gradient ring */}
      <div className="relative flex-shrink-0">
        <div
          className="w-20 h-20 sm:w-[90px] sm:h-[90px] rounded-full p-[3px]"
          style={{
            background: "linear-gradient(135deg, #000000, #333333, #666666)",
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl uppercase">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight leading-tight truncate uppercase">
          {user.firstName} {user.lastName}
        </h1>

        <p className="text-[11px] sm:text-sm text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-1.5 font-medium">
          Member since {joinedDate}
          <span className="inline-block w-[4px] h-[4px] bg-red-600 rounded-full" />
          {user.email}
        </p>
      </div>

    </div>
  );
};

export default ProfileHeader;