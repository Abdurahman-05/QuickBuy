import { useEffect, useMemo } from "react"
import { TrendingUp, Package } from "lucide-react"
import Gear from "../../assets/gear.svg"
import { useOrderStore } from "@/store/useOrderStore"

export default function OrdersTopSection() {
    const { allOrders, getAllOrders } = useOrderStore()

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    const totalRevenue = useMemo(
        () => allOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0),
        [allOrders]
    )
    const activeShipments = useMemo(
        () => allOrders.filter((order) => ["PROCESSING", "SHIPPED"].includes(order.orderStatus)).length,
        [allOrders]
    )

    return (
        <div className="w-full px-3 sm:px-6 mt-4 sm:mt-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                {/* LEFT: BIG HERO CARD */}
                <div className="lg:col-span-2 relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-[#f4f4f5] min-h-[220px] sm:min-h-[260px] flex items-center px-5 sm:px-10 py-6 sm:py-0">

                    {/* IMAGE */}
                    <img
                        src={Gear}
                        alt="gear"
                        className="absolute right-[-10%] sm:right-0 top-0 h-full w-[75%] sm:w-[65%] object-cover opacity-80 sm:opacity-85"
                    />

                    {/* FADE */}
                    <div className="absolute right-[50%] sm:right-[55%] top-0 h-full w-[35%] sm:w-[25%] bg-gradient-to-r from-[#f4f4f5] via-[#f4f4f5]/70 to-transparent" />

                    {/* CONTENT */}
                    <div className="relative z-10 max-w-lg sm:max-w-xl">

                        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-gray-400 mb-2 sm:mb-3 uppercase">
                            Quarterly Review
                        </p>

                        <h2 className="text-[26px] sm:text-[34px] lg:text-[44px] leading-[1.05] font-extrabold tracking-tight text-black">
                            TOTAL ORDERS <br /> {allOrders.length}
                        </h2>

                        <p className="mt-5 sm:mt-7 text-xs text-gray-500 font-semibold">
                            Connected to live order data from API.
                        </p>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-4 sm:gap-6">

                    {/* REVENUE CARD */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6">

                        <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm mb-2">
                            <TrendingUp size={16} />
                        </div>

                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase mb-1">
                            Total Revenue
                        </p>

                        <h3 className="text-xl sm:text-2xl font-bold">
                            ${totalRevenue.toFixed(2)}
                        </h3>
                    </div>

                    {/* SHIPMENTS CARD */}
                    <div className="bg-black text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex items-center justify-between">

                        <div>
                            <Package className="opacity-70 mb-3" />

                            <p className="text-[10px] sm:text-xs text-gray-400 uppercase mb-2">
                                Active Shipments
                            </p>

                            <h3 className="text-2xl sm:text-3xl font-bold">
                                {activeShipments}
                            </h3>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}