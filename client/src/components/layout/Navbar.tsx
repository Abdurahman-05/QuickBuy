import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { LogOut, Menu, X } from "lucide-react"
import { useAuthStore } from "../../store/useAuthStore"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)

    const adminNavItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Products", path: "/admin/products" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Users", path: "/admin/users" },
    ]

    return (
        <>
            {/* TOP BAR */}
            <div className="w-full h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 mt-14 lg:mt-0">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="lg:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </button>

                    {/* DESKTOP LINKS */}
                    <div className="hidden lg:flex items-center gap-8">
                        {adminNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `relative text-sm transition ${isActive ? "font-semibold text-black" : "text-gray-500 hover:text-black"}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 lg:gap-4">
                    <button
                        onClick={() => {
                            logout()
                            navigate("/login")
                        }}
                        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline text-sm font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed inset-0 bg-black/50 z-40 lg:hidden
                    transition-opacity duration-300
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
            />

            {/* MOBILE DRAWER (FULL HEIGHT) */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-72 bg-white z-50 lg:hidden
                    flex flex-col p-5 border-r
                    transform transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-bold text-red-500">Menu</h1>

                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-md active:scale-95 transition"
                    >
                        <X />
                    </button>
                </div>

                {/* LINKS */}
                <div className="flex flex-col gap-4 text-gray-700">
                    {adminNavItems.map((item) => (
                        <Link key={item.path} onClick={() => setOpen(false)} to={item.path}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* PUSH BOTTOM SECTION */}
                <div className="flex-1" />
                <Link
                    to="/login"
                    onClick={() => logout()}
                    className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                >
                    <LogOut size={16} />
                    Logout
                </Link>

            </div>
        </>
    )
}