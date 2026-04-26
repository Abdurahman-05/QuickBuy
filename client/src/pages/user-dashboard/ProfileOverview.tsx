import React from "react";
import ProfileHeader from "@/components/user-dashboard/profile-overview/ProfileHeader";
import StatsCards from "@/components/user-dashboard/profile-overview/StatsCards";
import RecentOrders from "@/components/user-dashboard/profile-overview/RecentOrders";
import AddressCard from "@/components/user-dashboard/profile-overview/AddressCard";

const ProfileOverview: React.FC = () => {
  return (
    <div className="space-y-8">

      {/* Profile Header */}
      <ProfileHeader />

      {/* Stats Cards */}
      <StatsCards />

      {/* Bottom Section: Orders + Address */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-8 items-start">

        {/* Recent Orders */}
        <RecentOrders />

        {/* Address Card */}
        <AddressCard />

      </div>

    </div>
  );
};

export default ProfileOverview;