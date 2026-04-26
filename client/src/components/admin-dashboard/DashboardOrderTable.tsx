import { useEffect, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { useOrderStore } from "@/store/useOrderStore"

export default function OrdersTable() {
    const { allOrders, getAllOrders, updateOrderStatus, verifyPayment } = useOrderStore()
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    const recentOrders = allOrders.slice(0, 3)

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 lg:p-7 w-full min-w-0">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase">
                    Recent Orders
                </h2>

                <Link to="/admin/orders" className="text-xs sm:text-sm font-medium relative w-fit hover:text-red-500 transition-colors">
                    View All Orders
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-500" />
                </Link>
            </div>

            {/* DESKTOP HEADER */}
            <div className="hidden md:grid grid-cols-[120px_1.5fr_120px_120px_140px_40px] text-[11px] uppercase text-gray-400 px-4 py-3 border-b">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Total</span>
                <span>Status</span>
                <span>Date</span>
                <span className="text-right">Action</span>
            </div>

            {/* ROWS */}
            <div className="space-y-3 mt-3">

                {recentOrders.map((order) => {
                    const customerName = `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.trim() || order.user?.email || "Customer"
                    return (
                    <div
                        key={order._id}
                        className="
                            bg-gray-50 rounded-xl p-4
                            md:grid md:grid-cols-[120px_1.5fr_120px_120px_140px_40px]
                            md:items-center md:px-4 md:py-3
                            flex flex-col gap-2
                            min-w-0
                        "
                    >

                        {/* ORDER ID */}
                        <span className="text-sm font-medium">
                            #{order._id.slice(-6).toUpperCase()}
                        </span>

                        {/* CUSTOMER */}
                        <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                                <AvatarImage src="" />
                                <AvatarFallback>
                                    {customerName[0]}
                                </AvatarFallback>
                            </Avatar>

                            <span className="text-sm text-gray-700 truncate">
                                {customerName}
                            </span>
                        </div>

                        {/* TOTAL */}
                        <span className="text-sm font-semibold">
                            ${Number(order.totalPrice || 0).toFixed(2)}
                        </span>

                        {/* STATUS */}
                        <span className="text-xs text-green-600">
                            {order.orderStatus}
                        </span>

                        {/* DATE */}
                        <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </span>

                        {/* ACTION */}
                        <div className="flex justify-end relative">
                            <button
                                className="p-2 rounded-full hover:bg-black/5 transition"
                                onClick={() => setActiveMenuId(activeMenuId === order._id ? null : order._id)}
                            >
                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </button>
                            {activeMenuId === order._id && (
                                <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-gray-200 bg-white shadow-xl p-1">
                                    <button
                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                        onClick={() => {
                                            void verifyPayment(order._id, "PAID")
                                            setActiveMenuId(null)
                                        }}
                                    >
                                        Mark as Paid
                                    </button>
                                    <button
                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                        onClick={() => {
                                            void updateOrderStatus(order._id, "SHIPPED")
                                            setActiveMenuId(null)
                                        }}
                                    >
                                        Set Shipped
                                    </button>
                                    <button
                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                        onClick={() => {
                                            void updateOrderStatus(order._id, "DELIVERED")
                                            setActiveMenuId(null)
                                        }}
                                    >
                                        Set Delivered
                                    </button>
                                    <button
                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 text-red-600"
                                        onClick={() => {
                                            navigate("/admin/orders")
                                            setActiveMenuId(null)
                                        }}
                                    >
                                        Open Full Orders
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                )})}

            </div>
        </div>
    )
}