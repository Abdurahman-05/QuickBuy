import { Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProductsNavbar() {
    return (
        <div className="w-full bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

            {/* LEFT NAV */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">

                <span className="font-semibold text-black relative shrink-0">
                    Inventory
                    <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2"></span>
                </span>

                <span className="text-gray-400 hover:text-black cursor-pointer transition shrink-0">
                    Collections
                </span>

                <span className="text-gray-400 hover:text-black cursor-pointer transition shrink-0">
                    Stock Alerts
                </span>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-5">

                {/* ICONS */}
                <div className="flex items-center gap-2 sm:gap-4 text-gray-500">

                    <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition">
                        <Bell size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>

                    <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition">
                        <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>

                </div>

                {/* USER */}
                <div className="flex items-center gap-2 sm:gap-3 border-l pl-3 sm:pl-5">

                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>

                    <button className="hidden sm:block text-xs sm:text-sm font-bold text-black hover:underline">
                        Logout
                    </button>

                </div>

            </div>
        </div>
    )
}