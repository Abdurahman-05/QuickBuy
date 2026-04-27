import React, { useState } from "react";
import OrdersStats from "@/components/user-dashboard/orders/OrdersStats";
import OrdersHeader from "@/components/user-dashboard/orders/OrdersHeader";
import OrdersList from "@/components/user-dashboard/orders/OrdersList";

const MyOrders: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED">("ALL");
  const [timeFilter, setTimeFilter] = useState<"ALL_TIME" | "LAST_30_DAYS" | "LAST_90_DAYS" | "THIS_YEAR">("ALL_TIME");

  return (
    <div className="space-y-2">

      {/* Stats Section */}
      <OrdersStats />

      {/* Order History Header */}
      <OrdersHeader
        statusFilter={statusFilter}
        timeFilter={timeFilter}
        onStatusFilterChange={setStatusFilter}
        onTimeFilterChange={setTimeFilter}
        onResetFilters={() => {
          setStatusFilter("ALL");
          setTimeFilter("ALL_TIME");
        }}
      />

      {/* Orders List */}
      <OrdersList statusFilter={statusFilter} timeFilter={timeFilter} />

    </div>
  );
};

export default MyOrders;
