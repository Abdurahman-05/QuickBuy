import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore";

export default function ProductsNavbar() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <div className="w-full bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

            {/* LEFT NAV */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `relative shrink-0 transition-colors ${isActive ? "font-semibold text-black" : "text-gray-400 hover:text-black"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            Inventory
                            {isActive && (
                                <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2"></span>
                            )}
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `shrink-0 transition-colors ${isActive ? "font-semibold text-black" : "text-gray-400 hover:text-black"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `shrink-0 transition-colors ${isActive ? "font-semibold text-black" : "text-gray-400 hover:text-black"
                        }`
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `shrink-0 transition-colors ${isActive ? "font-semibold text-black" : "text-gray-400 hover:text-black"
                        }`
                    }
                >
                    Users
                </NavLink>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-5">
                {/* USER */}
                <div className="flex items-center gap-2 sm:gap-3 border-l pl-3 sm:pl-5">

                    <Link to="/admin/dashboard" className="flex items-center gap-2 group">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-transparent group-hover:border-red-500 transition-all">
                            <AvatarImage src={user?.profileImage || ""} className="object-cover" />
                            <AvatarFallback className="bg-gray-100 font-bold text-gray-400 text-xs text-center border">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="hidden sm:block text-xs sm:text-sm font-bold text-black hover:underline"
                    >
                        Logout
                    </button>

                </div>

            </div>
        </div>
    )
}