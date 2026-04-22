import React from "react";
import SectionHeader from "../../components/user-dashboard/settings/SectionHeader";
import SettingsCard from "../../components/user-dashboard/settings/SettingsCard";
import ProfileInfoForm from "../../components/user-dashboard/settings/ProfileInfoForm";
import SecurityForm from "../../components/user-dashboard/settings/SecurityForm";
import PreferencesToggle from "../../components/user-dashboard/settings/PreferencesToggle";

const Settings: React.FC = () => {
  return (
    <div className="w-full max-w-4xl animate-in fade-in duration-500 pb-10">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-700 tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-sm font-medium text-gray-400">
          Manage your account preferences and personal information.</p>
      </div>

      <div className="space-y-12">
        {/* Profile Info Section */}
        <div className="flex flex-col lg:flex-row items-start border-t border-gray-200/60 pt-10">
          <SectionHeader
            title="Profile Info"
            description="Update your public profile and contact details to ensure your delivery information is accurate."
          />
          <SettingsCard>
            <ProfileInfoForm />
          </SettingsCard>
        </div>

        {/* Security Section */}
        <div className="flex flex-col lg:flex-row items-start border-t border-gray-200/60 pt-10">
          <SectionHeader
            title="Security"
            description="Ensure your account stays secure by using a strong password with symbols and numbers."
          />
          <SettingsCard>
            <SecurityForm />
          </SettingsCard>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col lg:flex-row items-start border-t border-gray-200/60 pt-10">
          <SectionHeader
            title="Preferences"
            description="Control how we communicate with you regarding order updates and new collection drops."
          />
          <SettingsCard>
            <PreferencesToggle />
          </SettingsCard>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-6 pt-10 border-t border-gray-200/60">
          <button className="text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors">
            Discard Changes
          </button>
          <button className="px-8 py-3 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;
