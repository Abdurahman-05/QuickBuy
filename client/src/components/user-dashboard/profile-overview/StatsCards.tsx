import React, { useEffect, useMemo } from "react";
import StatCard from "../shared/StatCard";
import { ShoppingBag, Trophy, Bookmark } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { useCommerceStore } from "@/store/useCommerceStore";

const StatsCards: React.FC = () => {
  const { myOrders, getMyOrders } = useOrderStore();
  const wishlistCount = useCommerceStore((state) => state.wishlistCount());

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const totalSpent = useMemo(
    () => myOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0),
    [myOrders]
  );
  const pointsBalance = useMemo(() => Math.round(totalSpent), [totalSpent]);

  const stats = [
    {
      title: "TOTAL ORDERS",
      value: String(myOrders.length),
      icon: ShoppingBag,
      iconColor: "#E53935",
    },
    {
      title: "POINTS BALANCE",
      value: pointsBalance.toLocaleString(),
      icon: Trophy,
      iconColor: "#E53935",
    },
    {
      title: "WISHLIST ITEMS",
      value: String(wishlistCount),
      icon: Bookmark,
      iconColor: "#E53935",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsCards;