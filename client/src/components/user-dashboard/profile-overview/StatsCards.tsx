import React from "react";
import StatCard from "../shared/StatCard";
import { ShoppingBag, Trophy, Bookmark } from "lucide-react";

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "TOTAL ORDERS",
      value: "24",
      icon: ShoppingBag,
      iconColor: "#E53935",
    },
    {
      title: "POINTS BALANCE",
      value: "12,450",
      icon: Trophy,
      iconColor: "#E53935",
    },
    {
      title: "WISHLIST ITEMS",
      value: "18",
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