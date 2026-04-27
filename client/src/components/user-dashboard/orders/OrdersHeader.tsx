import React, { useState } from "react";
import { ListFilter } from "lucide-react";

type OrderStatusFilter = "ALL" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
type OrderTimeFilter = "ALL_TIME" | "LAST_30_DAYS" | "LAST_90_DAYS" | "THIS_YEAR";

interface OrdersHeaderProps {
  statusFilter: OrderStatusFilter;
  timeFilter: OrderTimeFilter;
  onStatusFilterChange: (value: OrderStatusFilter) => void;
  onTimeFilterChange: (value: OrderTimeFilter) => void;
  onResetFilters: () => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({
  statusFilter,
  timeFilter,
  onStatusFilterChange,
  onTimeFilterChange,
  onResetFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const timeFilterLabel =
    timeFilter === "ALL_TIME"
      ? "All Time"
      : timeFilter === "LAST_30_DAYS"
        ? "Last 30 Days"
        : timeFilter === "LAST_90_DAYS"
          ? "Last 90 Days"
          : "This Year";

  const statusFilterLabel =
    statusFilter === "ALL" ? "All Statuses" : statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">

      {/* Title */}
      <h1 className="text-2xl sm:text-[25px] font-extrabold text-gray-900 tracking-tight uppercase">
        Order History
      </h1>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* All Time Button */}
        <button
          type="button"
          onClick={() => {
            onResetFilters();
            setIsFilterOpen(false);
          }}
          className="h-9 px-4 bg-gray-900 text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-gray-800 transition-colors inline-flex items-center"
        >
          All Time
        </button>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="h-9 px-4 pr-8 bg-white border border-gray-200/80 text-xs font-bold text-gray-700 tracking-wider uppercase rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Filter
          </button>
          <ListFilter
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          {isFilterOpen && (
            <div className="absolute right-0 top-11 w-64 rounded-xl border border-gray-200 bg-white shadow-lg p-3 z-20">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Time Range</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { value: "ALL_TIME", label: "All Time" },
                  { value: "LAST_30_DAYS", label: "Last 30 Days" },
                  { value: "LAST_90_DAYS", label: "Last 90 Days" },
                  { value: "THIS_YEAR", label: "This Year" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => onTimeFilterChange(item.value as OrderTimeFilter)}
                    className={`rounded-lg px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                      timeFilter === item.value
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Order Status</p>
              <div className="grid grid-cols-2 gap-2">
                {["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onStatusFilterChange(item as OrderStatusFilter)}
                    className={`rounded-lg px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                      statusFilter === item
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
                Showing: {timeFilterLabel} • {statusFilterLabel}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default OrdersHeader;
