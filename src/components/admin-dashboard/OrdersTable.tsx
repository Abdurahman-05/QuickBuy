import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const orders = [
    {
        id: "#QB-9021",
        customer: "Alexander Pierce",
        avatar: "https://i.pravatar.cc/40?img=12",
        total: "$1,299",
        status: "completed",
        date: "Oct 24",
    },
    {
        id: "#QB-9022",
        customer: "Sophia Martinez",
        avatar: "https://i.pravatar.cc/40?img=5",
        total: "$349",
        status: "completed",
        date: "Oct 24",
    },
    {
        id: "#QB-9023",
        customer: "Marcus Chen",
        avatar: "https://i.pravatar.cc/40?img=8",
        total: "$2,840",
        status: "completed",
        date: "Oct 23",
    },
]

export default function OrdersTable() {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 lg:p-7 w-full min-w-0">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <h2 className="text-xs sm:text-sm font-semibold tracking-widest uppercase">
                    Recent Orders
                </h2>

                <button className="text-xs sm:text-sm font-medium relative w-fit">
                    View All Archive
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-500" />
                </button>
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

                {orders.map((order) => (
                    <div
                        key={order.id}
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
                            {order.id}
                        </span>

                        {/* CUSTOMER */}
                        <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                                <AvatarImage src={order.avatar} />
                                <AvatarFallback>
                                    {order.customer[0]}
                                </AvatarFallback>
                            </Avatar>

                            <span className="text-sm text-gray-700 truncate">
                                {order.customer}
                            </span>
                        </div>

                        {/* TOTAL */}
                        <span className="text-sm font-semibold">
                            {order.total}
                        </span>

                        {/* STATUS */}
                        <span className="text-xs text-green-600">
                            {order.status === "completed" ? "Completed" : "Pending"}
                        </span>

                        {/* DATE */}
                        <span className="text-xs text-gray-500">
                            {order.date}
                        </span>

                        {/* ACTION */}
                        <div className="flex justify-end">
                            <button className="p-2 rounded-full hover:bg-black/5 transition">
                                <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}