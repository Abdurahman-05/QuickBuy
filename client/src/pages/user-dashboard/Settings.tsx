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
      <div className="mb-6 sm:mb-10">
        <h1 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2 uppercase">
          Account Settings
        </h1>
        <p className="text-[11px] sm:text-sm font-medium text-gray-400">
          Manage your account preferences and personal information.</p>
      </div>

      <div className="space-y-12">
        {/* Profile Info Section */}
        <div className="flex flex-col xl:flex-row items-start gap-6 border-t border-gray-200/60 pt-8 sm:pt-10">
          <SectionHeader
            title="Profile Info"
            description="Update your public profile and contact details to ensure your delivery information is accurate."
          />
          <SettingsCard>
            <ProfileInfoForm />
          </SettingsCard>
        </div>

        {/* Security Section */}
        <div className="flex flex-col xl:flex-row items-start gap-6 border-t border-gray-200/60 pt-8 sm:pt-10">
          <SectionHeader
            title="Security"
            description="Ensure your account stays secure by using a strong password with symbols and numbers."
          />
          <SettingsCard>
            <SecurityForm />
          </SettingsCard>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col xl:flex-row items-start gap-6 border-t border-gray-200/60 pt-8 sm:pt-10">
          <SectionHeader
            title="Preferences"
            description="Control how we communicate with you regarding order updates and new collection drops."
          />
          <SettingsCard>
            <PreferencesToggle />
          </SettingsCard>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 pt-10 border-t border-gray-200/60 mb-10">
          <button className="w-full sm:w-auto text-[11px] font-black text-gray-400 hover:text-gray-900 tracking-wider uppercase transition-colors">
            Discard Changes
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-black shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;
