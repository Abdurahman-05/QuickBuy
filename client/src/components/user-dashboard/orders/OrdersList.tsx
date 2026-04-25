import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useOrderStore } from "@/store/useOrderStore";

const OrdersList: React.FC = () => {
  const { myOrders, getMyOrders, isLoading, error } = useOrderStore();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  return (
    <div>
      {error && <p className="text-xs text-red-500 font-semibold mb-3">{error}</p>}
      {/* Order Cards */}
      <div className="flex flex-col gap-4">
        {myOrders.map((order) => {
          const firstItem = order.orderItems[0];
          return (
            <OrderCard
              key={order._id}
              orderId={`#${order._id.slice(-6).toUpperCase()}`}
              productId={firstItem?.product}
              productName={firstItem?.name || "Order Item"}
              image={firstItem?.image || "https://via.placeholder.com/100"}
              status={order.orderStatus}
              price={`$${Number(order.totalPrice || 0).toFixed(2)}`}
              date={new Date(order.createdAt).toLocaleDateString()}
            />
          );
        })}
        {!isLoading && myOrders.length === 0 && (
          <div className="bg-white border border-gray-200/60 rounded-xl p-6 text-sm text-gray-500">
            You have no orders yet.
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
