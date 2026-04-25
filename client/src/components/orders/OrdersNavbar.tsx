import { Bell, Settings, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"

export default function OrdersNavbar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <div className="w-full bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mt-14 lg:mt-0">

            {/* LEFT: Title + Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full max-w-xl mt-5">

                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                    Orders
                </h1>

                <form
                    className="relative w-full sm:w-auto group"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const searchQuery = formData.get("q");
                        if (searchQuery) window.location.assign(`/search?q=${encodeURIComponent(searchQuery.toString())}`);
                    }}
                >
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors z-10" size={16} />

                    <Input
                        name="q"
                        placeholder="Search orders..."
                        className="pl-10 w-full sm:w-64 h-11 rounded-2xl bg-gray-100/60 border-transparent focus:bg-white focus:ring-4 focus:ring-red-500/5 focus:border-red-500/30 transition-all text-sm font-medium"
                    />
                </form>

            </div>

            {/* RIGHT: Icons + User */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6">

                {/* Icons */}
                <div className="flex items-center gap-3 sm:gap-4 text-gray-500">
                    <Link to="/dashboard/settings"><Bell size={18} className="cursor-pointer hover:text-black transition" /></Link>
                    <Link to="/dashboard/settings"><Settings size={18} className="cursor-pointer hover:text-black transition" /></Link>
                </div>

                {/* User */}
                <div className="flex items-center gap-3">

                    <span className="text-[10px] sm:text-xs font-bold text-gray-900 hidden sm:block">
                        {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase() || ""}
                    </span>

                    <Link to="/admin/dashboard" className="flex items-center gap-2 group">
                        <Avatar className="h-8 w-8 border border-transparent group-hover:border-red-500 transition-all shrink-0">
                            {user?.profileImage && user.profileImage.trim().length > 0 ? (
                                <AvatarImage src={user.profileImage} className="object-cover" />
                            ) : null}
                            <AvatarFallback className="bg-gray-100 font-bold text-gray-400 text-xs text-center border">
                                {user?.firstName?.[0] || ""}{user?.lastName?.[0] || ""}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <button onClick={handleLogout} className="text-[10px] sm:text-xs text-red-500 font-semibold hover:underline">
                        LOGOUT
                    </button>

                </div>

            </div>
        </div>
    )
}