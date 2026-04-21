import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";

const RecentOrders: React.FC = () => {
  const orders = [
    { id: "#QB-89231", date: "Oct 12, 2023", status: "Delivered", total: "$1,299.00" },
    { id: "#QB-89204", date: "Sep 28, 2023", status: "Processing", total: "$49.00" },
    { id: "#QB-89188", date: "Sep 15, 2023", status: "Delivered", total: "$349.99" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">
          Recent Orders
        </h2>

        <Link to="/dashboard/orders" className="text-[11px] font-bold text-red-500 underline decoration-red-600 hover:text-red-600 tracking-[0.08em] uppercase transition-colors">
          View All
        </Link>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/60">
              <th className="text-left text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase pb-3 pr-4">
                Order ID
              </th>
              <th className="text-left text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase pb-3 pr-4">
                Date
              </th>
              <th className="text-left text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase pb-3 pr-4">
                Status
              </th>
              <th className="text-right text-[10px] font-semibold text-gray-400 tracking-[0.1em] uppercase pb-3">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`transition-colors hover:bg-gray-50/50 ${index < orders.length - 1 ? "border-b border-gray-100/80" : ""
                  }`}
              >
                <td className="py-4 pr-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {order.id}
                  </span>
                </td>

                <td className="py-4 pr-4">
                  <span className="text-sm text-gray-500">
                    {order.date}
                  </span>
                </td>

                <td className="py-4 pr-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="py-4 text-right">
                  <span className="text-sm font-semibold text-gray-900">
                    {order.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200/60 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-gray-900">{order.id}</p>
              <p className="text-xs text-gray-400">{order.date}</p>
              <StatusBadge status={order.status} />
            </div>

            <p className="text-sm font-bold text-gray-900">{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;