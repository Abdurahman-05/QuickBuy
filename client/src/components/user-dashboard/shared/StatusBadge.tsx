import React from "react";

interface StatusBadgeProps {
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled" | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = (): string => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-gray-900 text-white";
      case "processing":
        return "bg-red-500 text-white";
      case "shipped":
        return "bg-gray-900 text-white";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-2.5 py-[3px]
        text-[10px]
        font-bold
        tracking-wider
        uppercase
        rounded-full
        whitespace-nowrap
        ${getStyles()}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;