import React from "react";
import OrderCard from "./OrderCard";

const OrdersList: React.FC = () => {
  const orders = [
    {
      orderId: "#QB-90214",
      productName: 'iPad Pro 12.9" M2 Space Gray',
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
      status: "Processing",
      price: "$1,099.00",
      date: "Oct 24, 2023",
    },
    {
      orderId: "#QB-89441",
      productName: "Studio One Headphones - Matte Black",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      status: "Delivered",
      price: "$349.00",
      date: "Sep 12, 2023",
    },
    {
      orderId: "#QB-88120",
      productName: "Vanguard Smart Series X - Steel",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      status: "Shipped",
      price: "$599.00",
      date: "Aug 30, 2023",
    },
  ];

  return (
    <div>
      {/* Order Cards */}
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.orderId} {...order} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-10 flex flex-col items-center gap-2">
        <button className="text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase hover:text-gray-900 transition-colors">
          Load More History
        </button>
        <div className="w-8 h-[2px] bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default OrdersList;
