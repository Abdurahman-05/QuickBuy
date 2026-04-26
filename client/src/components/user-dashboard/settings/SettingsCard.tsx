import React from "react";

interface SettingsCardProps {
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-200/30 rounded-3xl p-6 sm:p-8">
      {children}
    </div>
  );
};

export default SettingsCard;
