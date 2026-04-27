import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useOrderStore } from "@/store/useOrderStore";
import type { OrderRecord } from "@/types/order";

interface OrdersListProps {
  statusFilter: "ALL" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  timeFilter: "ALL_TIME" | "LAST_30_DAYS" | "LAST_90_DAYS" | "THIS_YEAR";
}

const isOrderInTimeFilter = (order: OrderRecord, timeFilter: OrdersListProps["timeFilter"]) => {
  if (timeFilter === "ALL_TIME") return true;

  const createdAt = new Date(order.createdAt);
  if (Number.isNaN(createdAt.getTime())) return false;

  const now = new Date();
  if (timeFilter === "LAST_30_DAYS") {
    const threshold = new Date(now);
    threshold.setDate(now.getDate() - 30);
    return createdAt >= threshold;
  }
  if (timeFilter === "LAST_90_DAYS") {
    const threshold = new Date(now);
    threshold.setDate(now.getDate() - 90);
    return createdAt >= threshold;
  }

  return createdAt.getFullYear() === now.getFullYear();
};

const OrdersList: React.FC<OrdersListProps> = ({ statusFilter, timeFilter }) => {
  const { myOrders, getMyOrders, isLoading, error } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const filteredOrders = myOrders.filter((order) => {
    const matchesStatus = statusFilter === "ALL" || order.orderStatus === statusFilter;
    const matchesTime = isOrderInTimeFilter(order, timeFilter);
    return matchesStatus && matchesTime;
  });

  return (
    <div>
      {error && <p className="text-xs text-red-500 font-semibold mb-3">{error}</p>}
      {/* Order Cards */}
      <div className="flex flex-col gap-4">
        {filteredOrders.map((order) => {
          const firstItem = order.orderItems[0];
          const rawProduct = firstItem?.product as unknown;
          const productId =
            typeof rawProduct === "string"
              ? rawProduct
              : rawProduct && typeof rawProduct === "object"
                ? String(
                    (rawProduct as { _id?: string; id?: string })._id ||
                      (rawProduct as { _id?: string; id?: string }).id ||
                      ""
                  )
                : "";
          return (
            <OrderCard
              key={order._id}
              orderId={`#${order._id.slice(-6).toUpperCase()}`}
              productId={productId || undefined}
              productName={firstItem?.name || "Order Item"}
              image={firstItem?.image || "https://via.placeholder.com/100"}
              status={order.orderStatus}
              price={`$${Number(order.totalPrice || 0).toFixed(2)}`}
              date={new Date(order.createdAt).toLocaleDateString()}
            />
          );
        })}
        {!isLoading && filteredOrders.length === 0 && (
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 text-sm text-gray-500">
            No orders match your current filters.
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="mt-10 flex flex-col items-center gap-2">
        <Link to="/products" className="text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase hover:text-gray-900 transition-colors">
          Continue Shopping
        </Link>
        <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default OrdersList;
