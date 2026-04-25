import { MoreHorizontal, ListFilter, Download } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "../ui/button"

const orders = [
    {
        id: "#QB-1024",
        name: "Julianne Defrancesco",
        initials: "JD",
        amount: "$1,299.00",
        status: "Completed",
        date: "Oct 24, 2023",
    },
    {
        id: "#QB-1025",
        name: "Marcus Kinsley",
        initials: "MK",
        amount: "$450.50",
        status: "Pending",
        date: "Oct 24, 2023",
    },
    {
        id: "#QB-1026",
        name: "Sarah Lichtman",
        initials: "SL",
        amount: "$2,499.99",
        status: "Cancelled",
        date: "Oct 23, 2023",
    },
    {
        id: "#QB-1027",
        name: "Benjamin Wyatt",
        initials: "BW",
        amount: "$89.00",
        status: "Completed",
        date: "Oct 23, 2023",
    },
    {
        id: "#QB-1028",
        name: "Tobias Lindholm",
        initials: "TL",
        amount: "$154.00",
        status: "Pending",
        date: "Oct 22, 2023",
    },
]

export default function OrdersTable() {
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
                            Displaying most recent 50 orders
                        </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">

                        <Button
                            variant="outline"
                            className="h-8 sm:h-9 px-3 sm:px-4 rounded-full border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] sm:text-xs font-medium flex items-center gap-2"
                        >
                            <ListFilter size={14} />
                            Filter
                        </Button>

                        <Button
                            className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] sm:text-xs font-medium flex items-center gap-2 shadow-none"
                        >
                            <Download size={14} />
                            Export
                        </Button>

                    </div>
                </div>

                {/* TABLE WRAPPER */}
                <div className="overflow-x-auto">

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
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-100 hover:bg-gray-50/60 transition"
                                >

                                    {/* ORDER ID */}
                                    <td className="py-4 sm:py-5 font-medium text-gray-900 whitespace-nowrap">
                                        {order.id}
                                    </td>

                                    {/* CUSTOMER */}
                                    <td className="whitespace-nowrap">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <Avatar className="h-7 w-7 sm:h-9 sm:w-9 bg-gray-200">
                                                <AvatarFallback className="text-[10px] sm:text-xs font-medium text-gray-600">
                                                    {order.initials}
                                                </AvatarFallback>
                                            </Avatar>

                                            <span className="text-gray-800 text-xs sm:text-sm">
                                                {order.name}
                                            </span>
                                        </div>
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="font-medium text-gray-900 whitespace-nowrap">
                                        {order.amount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="whitespace-nowrap">
                                        <StatusBadge status={order.status} />
                                    </td>

                                    {/* DATE */}
                                    <td className="text-gray-500 whitespace-nowrap">
                                        {order.date}
                                    </td>

                                    {/* ACTION */}
                                    <td className="text-right whitespace-nowrap">
                                        <div className="flex justify-end">
                                            <button className="p-1 sm:p-2 rounded-full hover:bg-black/5 transition">
                                                <MoreHorizontal className="h-4 w-4 text-gray-500 hover:text-black" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 text-xs sm:text-sm text-gray-400 gap-3">

                    <span>Page 1 of 12</span>

                    <div className="flex items-center gap-2">
                        <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border flex items-center justify-center hover:bg-gray-100">
                            ‹
                        </button>

                        <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black text-white flex items-center justify-center">
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
        Completed: "bg-green-100 text-green-600",
        Pending: "bg-yellow-100 text-yellow-600",
        Cancelled: "bg-red-100 text-red-500",
    }

    return (
        <span
            className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium ${styles[status as keyof typeof styles]}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status.toUpperCase()}
        </span>
    )
}