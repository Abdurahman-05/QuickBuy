import React, { useMemo } from "react";
import { Crown, Truck } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";

const OrdersStats: React.FC = () => {
  const myOrders = useOrderStore((state) => state.myOrders);

  const totalSpent = useMemo(
    () => myOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0),
    [myOrders]
  );
  const activeShipments = useMemo(
    () => myOrders.filter((order) => ["PROCESSING", "SHIPPED"].includes(order.orderStatus)).length,
    [myOrders]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">

      {/* Total Purchases */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-5 sm:p-6">
        <p className="text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase mb-3">
          Total Purchases
        </p>
        <h3 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-3">
          {myOrders.length}
        </h3>
        <div className="flex items-center justify-between gap-5">
          <span className="text-xs font-bold text-red-500">Lifetime Value</span>
          <span className="text-xs font-bold text-red-500">${totalSpent.toFixed(2)}</span>
        </div>
      </div>

      {/* Active Shipments */}
      <div className="bg-white border border-gray-200/60 rounded-xl p-5 sm:p-6">
        <p className="text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase mb-3">
          Active Shipments
        </p>
        <h3 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-3">
          {String(activeShipments).padStart(2, "0")}
        </h3>
        <div className="flex items-center justify-between gap-2 text-gray-400">
          <span className="text-xs font-medium">Arriving soon</span>
          <Truck size={12} className="text-gray-300" />
        </div>
      </div>

      {/* Membership Status — Dark Card */}
      <div className="bg-gray-900 rounded-xl p-5 sm:p-6 relative overflow-hidden sm:col-span-2 lg:col-span-1">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-[0.06]">
          <Crown size={100} className="text-white" />
        </div>

        <p className="text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase mb-2 relative z-10">
          Membership Status
        </p>
        <h3 className="text-[28px] font-extrabold text-white tracking-tight leading-none mb-2 relative z-10">
          {myOrders.length >= 10 ? "ELITE" : "MEMBER"}
        </h3>
        <p className="text-xs text-gray-500 relative z-10">
          {myOrders.length >= 10 ? "Free priority shipping enabled" : "Keep shopping to unlock elite perks"}
        </p>
      </div>

    </div>
  );
};

export default OrdersStats;
