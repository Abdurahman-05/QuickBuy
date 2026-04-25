import { Bell, Settings, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProductNavbar() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 md:py-6 gap-4 sm:gap-0 bg-[#f9fafb] border-b mt-5 lg:mt-0">

            {/* LEFT - BACK */}
            <Link
                to="/products"
                className="flex items-center w-full sm:w-auto justify-start gap-2 text-gray-500 hover:text-black transition"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back to List</span>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 md:gap-6">

                {/* ICONS */}
                <div className="flex items-center gap-1 md:gap-2">
                    <Link to="/notifications" className="p-1.5 md:p-2 hover:bg-gray-100 rounded-md transition border-transparent border hover:border-gray-200">
                        <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-black transition" />
                    </Link>
                    <Link to="/settings" className="p-1.5 md:p-2 hover:bg-gray-100 rounded-md transition border-transparent border hover:border-gray-200">
                        <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-black transition" />
                    </Link>
                </div>

                {/* USER */}
                <div className="flex items-center gap-3 border-l pl-4 md:pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-black">Admin User</p>
                        <Link to="/login" className="text-xs text-gray-400 hover:text-black hover:underline transition-all">
                            Logout
                        </Link>
                    </div>

                    <Link to="/profile">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="Admin profile"
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 hover:border-black transition-all"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}