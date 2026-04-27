import { useEffect, useMemo, useRef, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { useOrderStore } from "@/store/useOrderStore"
import type { OrderRecord } from "@/types/order"

export default function OrdersTable() {
    const { allOrders, getAllOrders, updateOrderStatus, verifyPayment, isLoading, error } = useOrderStore()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(10)
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
    const tableWrapRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    const totalPages = Math.max(1, Math.ceil(allOrders.length / pageSize))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedOrders = useMemo(
        () => allOrders.slice((safePage - 1) * pageSize, safePage * pageSize),
        [allOrders, safePage, pageSize]
    )
    const startIndex = allOrders.length === 0 ? 0 : (safePage - 1) * pageSize + 1
    const endIndex = Math.min(safePage * pageSize, allOrders.length)
    const pageNumbers = useMemo(
        () =>
            Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
                if (totalPages <= 7) return true
                if (page === 1 || page === totalPages) return true
                return Math.abs(page - safePage) <= 1
            }),
        [totalPages, safePage]
    )

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        const onDocumentClick = (event: MouseEvent) => {
            if (!tableWrapRef.current) return
            if (!tableWrapRef.current.contains(event.target as Node)) {
                setActiveMenuId(null)
            }
        }
        document.addEventListener("mousedown", onDocumentClick)
        return () => document.removeEventListener("mousedown", onDocumentClick)
    }, [])

    const formatName = (order: OrderRecord) => {
        const first = order.user?.firstName || ""
        const last = order.user?.lastName || ""
        const full = `${first} ${last}`.trim()
        return full || order.user?.email || "Customer"
    }

    const getInitials = (name: string) =>
        name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join("") || "NA"

    const statusLabel = (order: OrderRecord) => order.orderStatus

    const runOrderAction = async (orderId: string, action: () => Promise<void>) => {
        setActionLoadingId(orderId)
        setActiveMenuId(null)
        try {
            await action()
        } finally {
            setActionLoadingId(null)
        }
    }

    return (
        <div className="w-full px-3 sm:px-6 mt-6">

            <div className="bg-white rounded-2xl sm:rounded-3xl border p-4 sm:p-6">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">
                            Transaction Log
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-400">
                            Displaying most recent orders
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Button
                            className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] sm:text-xs font-medium flex items-center gap-2 shadow-none"
                            onClick={() => getAllOrders()}
                        >
                            Refresh
                        </Button>

                    </div>
                </div>
                {error && <p className="text-xs text-red-500 font-semibold mb-3">{error}</p>}

                {/* TABLE WRAPPER */}
                <div ref={tableWrapRef} className="overflow-x-auto overflow-y-visible">

                    <table className="w-full text-xs sm:text-sm min-w-[700px]">

                        {/* HEADER */}
                        <thead className="text-left text-gray-400 border-b">
                            <tr>
                                <th className="py-3 whitespace-nowrap">Order ID</th>
                                <th className="whitespace-nowrap">Customer Name</th>
                                <th className="whitespace-nowrap">Total Amount</th>
                                <th className="whitespace-nowrap">Status</th>
                                <th className="whitespace-nowrap">Order Date</th>
                                <th className="text-right whitespace-nowrap">Action</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {paginatedOrders.map((order) => {
                                const customerName = formatName(order)
                                const displayStatus = statusLabel(order)
                                return (
                                <tr
                                    key={order._id}
                                    className="border-t border-gray-100 hover:bg-gray-50/60 transition"
                                >

                                    {/* ORDER ID */}
                                    <td className="py-4 sm:py-5 font-medium text-gray-900 whitespace-nowrap">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>

                                    {/* CUSTOMER */}
                                    <td className="whitespace-nowrap">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <Avatar className="h-7 w-7 sm:h-9 sm:w-9 bg-gray-200">
                                                <AvatarFallback className="text-[10px] sm:text-xs font-medium text-gray-600">
                                                    {getInitials(customerName)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <span className="text-gray-800 text-xs sm:text-sm">
                                                {customerName}
                                            </span>
                                        </div>
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="font-medium text-gray-900 whitespace-nowrap">
                                        ${Number(order.totalPrice || 0).toFixed(2)}
                                    </td>

                                    {/* STATUS */}
                                    <td className="whitespace-nowrap">
                                        <StatusBadge status={displayStatus} />
                                    </td>

                                    {/* DATE */}
                                    <td className="text-gray-500 whitespace-nowrap">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    {/* ACTION */}
                                    <td className="text-right whitespace-nowrap">
                                        <div className="flex justify-end items-center gap-1 relative">
                                            <button
                                                className="p-1 sm:p-2 rounded-full hover:bg-black/5 transition disabled:opacity-50"
                                                onClick={() => setActiveMenuId(activeMenuId === order._id ? null : order._id)}
                                                title="More actions"
                                                disabled={actionLoadingId === order._id}
                                            >
                                                <MoreHorizontal className="h-4 w-4 text-gray-500 hover:text-black" />
                                            </button>
                                            {activeMenuId === order._id && (
                                                <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-gray-200 bg-white shadow-xl p-1">
                                                    <button
                                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                                        onClick={() => runOrderAction(order._id, () => verifyPayment(order._id, "PAID"))}
                                                    >
                                                        Mark as Paid
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                                        onClick={() => runOrderAction(order._id, () => updateOrderStatus(order._id, "SHIPPED"))}
                                                    >
                                                        Set Shipped
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100"
                                                        onClick={() => runOrderAction(order._id, () => updateOrderStatus(order._id, "DELIVERED"))}
                                                    >
                                                        Set Delivered
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                            )})}
                        </tbody>

                    </table>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 text-xs sm:text-sm text-gray-400 gap-3">

                    <span>
                        Showing {startIndex}-{endIndex} of {allOrders.length} orders
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                            disabled={safePage <= 1 || isLoading}
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        >
                            ‹
                        </button>

                        {pageNumbers.map((page, index) => {
                            const previous = pageNumbers[index - 1]
                            const showLeftEllipsis = previous && page - previous > 1
                            return (
                                <div key={page} className="flex items-center gap-2">
                                    {showLeftEllipsis && (
                                        <span className="text-xs text-gray-400 px-1">...</span>
                                    )}
                                    <button
                                        className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                                            safePage === page
                                                ? "bg-black text-white"
                                                : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                                        }`}
                                        disabled={isLoading}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                </div>
                            )
                        })}

                        <button
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black text-white flex items-center justify-center disabled:opacity-50"
                            disabled={safePage >= totalPages || isLoading}
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        >
                            ›
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

/* STATUS BADGE */
function StatusBadge({ status }: { status: string }) {
    const styles = {
        PENDING: "bg-yellow-100 text-yellow-700",
        PROCESSING: "bg-blue-100 text-blue-700",
        SHIPPED: "bg-indigo-100 text-indigo-700",
        DELIVERED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-600",
    }

    return (
        <span
            className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium ${styles[status as keyof typeof styles] || "bg-gray-100 text-gray-600"}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
        </span>
    )
}