import React from "react";
const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-2xl shadow-sm border border-gray-50">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
    <p className="text-gray-500 font-medium">This page is coming soon as part of the new premium experience.</p>
  </div>
);

export const Wishlist = () => <ComingSoon title="Wishlist" />;
export const Addresses = () => <ComingSoon title="Shipping Addresses" />;
export const AccountSettings = () => <ComingSoon title="Account Settings" />;
