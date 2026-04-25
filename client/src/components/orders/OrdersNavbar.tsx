import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, NavLink, useNavigate } from "react-router-dom"
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

            {/* LEFT: Title + Nav */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full max-w-xl mt-5">

                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                    Orders
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black")}>Dashboard</NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black")}>Products</NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "text-black font-semibold" : "hover:text-black")}>Users</NavLink>
                </div>

            </div>

            {/* RIGHT: User */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6">

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