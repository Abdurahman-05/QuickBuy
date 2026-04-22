import { Bell, Settings, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProductNavbar() {
    return (
        <div className="flex items-center justify-between px-10 py-6 bg-[#f9fafb] border-b mt-5 lg:mt-0">

            {/* LEFT - BACK */}
            <Link
                to="/products"
                className="flex items-center gap-2 text-gray-500 hover:text-black transition"
            >
                <ArrowLeft size={18} />
                Back to List
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-6">

                {/* ICONS */}
                <Link to="/notifications" className="p-1 hover:bg-gray-100 rounded-md transition border-transparent border hover:border-black/5">
                    <Bell className="w-5 h-5 text-gray-400 hover:text-black transition" />
                </Link>
                <Link to="/settings" className="p-1 hover:bg-gray-100 rounded-md transition border-transparent border hover:border-black/5">
                    <Settings className="w-5 h-5 text-gray-400 hover:text-black transition" />
                </Link>

                {/* USER */}
                <div className="flex items-center gap-3 border-l pl-6">
                    <div className="text-right">
                        <p className="text-sm font-medium text-black">Admin User</p>
                        <Link to="/login" className="text-xs text-gray-400 hover:text-black hover:underline transition-all">
                            Logout
                        </Link>
                    </div>

                    <Link to="/profile">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="Admin profile"
                            className="w-9 h-9 rounded-full border border-transparent hover:border-black transition-all"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}