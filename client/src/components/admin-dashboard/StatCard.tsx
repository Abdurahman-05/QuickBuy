import {
    ShoppingCart,
    Users,
    Package,
    DollarSign,
    TrendingUp,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface StatCardProps {
    title: string
    value: string | number
    change?: string
    trend?: "up" | "stable" | "down"
    type: "products" | "orders" | "users" | "revenue"
    path: string
}

export default function StatCard({
    title,
    value,
    change,
    trend = "stable",
    type,
    path
}: StatCardProps) {
    const icons = {
        products: Package,
        orders: ShoppingCart,
        users: Users,
        revenue: DollarSign,
    }

    const Icon = icons[type]
    const isRevenue = type === "revenue"

    const numericValue =
        typeof value === "number"
            ? value
            : Number(String(value).replace(/,/g, ""))

    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (isNaN(numericValue)) return

        let start = performance.now()
        const duration = 1000

        const animate = (t: number) => {
            const progress = Math.min((t - start) / duration, 1)
            setDisplayValue(Math.floor(progress * numericValue))
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [numericValue])

    return (
        <Link
            to={path}
            className={`
                relative overflow-hidden rounded-2xl border
                w-full min-w-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                ${isRevenue
                    ? "bg-black text-white p-4 sm:p-5 lg:p-7 shadow-lg shadow-black/20"
                    : "bg-[#f7f7f7] text-black p-4 sm:p-5 lg:p-6 hover:bg-white hover:border-black/10 shadow-sm"
                }
            `}
        >

            {/* ICON */}
            <Icon
                className={`
                    absolute bottom-[-10px] right-[-10px]
                    pointer-events-none select-none
                    opacity-10
                    ${isRevenue
                        ? "h-16 w-16 sm:h-24 lg:h-32"
                        : "h-14 w-14 sm:h-20 lg:h-28"
                    }
                `}
            />

            {/* CONTENT */}
            <div className="relative z-10 space-y-1 sm:space-y-2">

                {/* TITLE */}
                <p className="text-[10px] sm:text-xs lg:text-[11px] uppercase tracking-widest text-gray-400">
                    {title}
                </p>

                {/* VALUE */}
                <h2
                    className={`
                        font-bold leading-tight break-words
                        ${isRevenue
                            ? "text-xl sm:text-3xl lg:text-4xl"
                            : "text-lg sm:text-2xl lg:text-3xl"
                        }
                    `}
                >
                    {type === "revenue" && "$"}
                    {typeof value === "number"
                        ? displayValue.toLocaleString()
                        : value}
                </h2>

                {/* CHANGE */}
                {change && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                        {trend === "up" && (
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                        )}

                        <span
                            className={
                                isRevenue
                                    ? "text-red-400"
                                    : trend === "up"
                                        ? "text-green-600"
                                        : trend === "down"
                                            ? "text-red-500"
                                            : "text-gray-500"
                            }
                        >
                            {change}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    )
}