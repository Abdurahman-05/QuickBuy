import { Bell, Settings, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export default function OrdersNavbar() {
    return (
        <div className="w-full bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mt-14 lg:mt-0">

            {/* LEFT: Title + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full max-w-xl mt-5">

                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                    Orders
                </h1>

                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />

                    <Input
                        placeholder="Search orders..."
                        className="pl-10 w-full sm:w-64 rounded-full bg-gray-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>

            </div>

            {/* RIGHT: Icons + User */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6">

                {/* Icons */}
                <div className="flex items-center gap-3 sm:gap-4 text-gray-500">
                    <Bell size={18} className="cursor-pointer hover:text-black transition" />
                    <Settings size={18} className="cursor-pointer hover:text-black transition" />
                </div>

                {/* User */}
                <div className="flex items-center gap-3">

                    <span className="text-[10px] sm:text-xs font-bold text-gray-900">
                        ADMIN USER
                    </span>

                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/100" />
                        <AvatarFallback>AU</AvatarFallback>
                    </Avatar>

                    <button className="text-[10px] sm:text-xs text-red-500 font-semibold hover:underline">
                        LOGOUT
                    </button>

                </div>

            </div>
        </div>
    )
}