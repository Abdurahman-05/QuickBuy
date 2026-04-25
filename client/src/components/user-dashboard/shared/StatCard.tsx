import React from "react";
import { type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard: React.FC<Props> = ({
  title,
  value,
  icon: Icon,
  iconColor = "#E53935",
}) => {
  return (
    <div className="bg-gray-100 border border-gray-200/60 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-gray-200 group">

      {/* Icon */}
      <div className="mb-5">
        <Icon size={20} style={{ color: iconColor }} strokeWidth={1.8} />
      </div>

      {/* Label */}
      <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 tracking-[0.1em] uppercase mb-2">
        {title}
      </p>

      {/* Value */}
      <h3 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight leading-none">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;