import React, { useState } from "react";

interface ToggleItemProps {
  title: string;
  description: string;
  defaultChecked: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({
  title,
  description,
  defaultChecked,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      className="
        flex items-center justify-between
        bg-gray-50
        rounded-xl
        px-5 py-4
      "
    >
      {/* TEXT */}
      <div className="flex-1 pr-6">
        <p className="text-sm font-semibold text-gray-900">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[220px]">
          {description}
        </p>
      </div>

      {/* CHECKBOX */}
      <button
        onClick={() => setChecked(!checked)}
        className={`
          w-5 h-5 rounded-md flex items-center justify-center
          transition-all duration-200
          ${checked ? "bg-black" : "bg-gray-200"}
        `}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

const PreferencesToggle: React.FC = () => {
  const preferences = [
    {
      title: "Email Notifications",
      description: "Receive invoices and shipping confirmations.",
      defaultChecked: true,
    },
    {
      title: "SMS Alerts",
      description: "Real-time tracking notifications via text.",
      defaultChecked: false,
    },
    {
      title: "Promotional Updates",
      description: "Curated electronics releases and member-only events.",
      defaultChecked: true,
    },
  ];

  return (
    <div
      className="
        bg-gray-100
        rounded-3xl
        p-4
        flex flex-col gap-3
      "
    >
      {preferences.map((pref) => (
        <ToggleItem
          key={pref.title}
          title={pref.title}
          description={pref.description}
          defaultChecked={pref.defaultChecked}
        />
      ))}
    </div>
  );
};

export default PreferencesToggle;