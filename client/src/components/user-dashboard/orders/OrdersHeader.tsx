import React from "react";
import { ListFilter } from "lucide-react";

const OrdersHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">

      {/* Title */}
      <h1 className="text-2xl sm:text-[25px] font-extrabold text-gray-900 tracking-tight uppercase">
        Order History
      </h1>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* All Time Button */}
        <button className="h-9 px-4 bg-gray-900 text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors">
          All Time
        </button>

        {/* Filter Dropdown */}
        <div className="relative">
          <button className="h-9 px-4 pr-8 bg-white border border-gray-200/80 text-xs font-bold text-gray-700 tracking-wider uppercase rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
            Filter
          </button>
          <ListFilter
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

    </div>
  );
};

export default OrdersHeader;
