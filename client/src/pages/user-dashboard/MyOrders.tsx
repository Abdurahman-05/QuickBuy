import React from "react";
import OrdersStats from "@/components/user-dashboard/orders/OrdersStats";
import OrdersHeader from "@/components/user-dashboard/orders/OrdersHeader";
import OrdersList from "@/components/user-dashboard/orders/OrdersList";

const MyOrders: React.FC = () => {
  return (
    <div className="space-y-2">

      {/* Stats Section */}
      <OrdersStats />

      {/* Order History Header */}
      <OrdersHeader />

      {/* Orders List */}
      <OrdersList />

    </div>
  );
};

export default MyOrders;
