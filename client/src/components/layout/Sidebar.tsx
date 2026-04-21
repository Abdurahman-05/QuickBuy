import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    HelpCircle,
    Settings,
    Plus,
    Menu,
    X,
    LogOut,
} from "lucide-react"

export default function Sidebar() {
    const [open, setOpen] = useState(false)

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Products", icon: Package, path: "/admin/products" },
        { name: "Orders", icon: ShoppingCart, path: "/orders" },
        { name: "Users", icon: Users, path: "/users" },
    ]

    return (
        <>
            {/* MOBILE TOP BAR */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-[70]">
                <Link to="/" className="text-lg font-bold text-red-500">
                    QuickBuy
                </Link>

                <button
                    onClick={() => setOpen(true)}
                    className="p-2 active:scale-95 transition"
                    aria-label="Open sidebar"
                >
                    <Menu />
                </button>
            </div>

            {/* OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed inset-0 bg-black/50 z-[80] lg:hidden
                    transition-opacity duration-300
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
            />

            {/* SIDEBAR DRAWER */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-72 bg-white z-[90]
                    flex flex-col p-4 border-r
                    transform transition-transform duration-300 ease-in-out
                    lg:static lg:h-screen lg:w-64
                    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >

                {/* CLOSE BUTTON (mobile) */}
                <div className="lg:hidden flex justify-end mb-2">
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 active:scale-95 transition"
                        aria-label="Close sidebar"
                    >
                        <X />
                    </button>
                </div>

                {/* BRAND */}
                <Link to="/" className="mb-8 pt-2 block">
                    <h1 className="text-2xl font-bold text-red-500">
                        QuickBuy
                    </h1>
                    <p className="text-xs text-gray-400 tracking-wide">
                        MANAGEMENT CONSOLE
                    </p>
                </Link>

                {/* NAV */}
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                                        isActive
                                            ? "bg-gray-100 text-black font-medium"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </nav>

                <div className="flex-1" />

                {/* BOTTOM */}
                <div className="space-y-3">
                    <Link 
                        to="/addproduct"
                        onClick={() => setOpen(false)}
                        className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition"
                    >
                        <Plus size={16} />
                        <span className="text-sm font-medium">Add Product</span>
                    </Link>

                    <NavLink
                        to="/support"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 transition ${
                                isActive ? "bg-gray-100 text-black font-medium rounded-xl" : "text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl"
                            }`
                        }
                    >
                        <HelpCircle size={18} />
                        Support
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 transition ${
                                isActive ? "bg-gray-100 text-black font-medium rounded-xl" : "text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl"
                            }`
                        }
                    >
                        <Settings size={18} />
                        Settings
                    </NavLink>
                </div>

                {/* USER SECTION AT BOTTOM */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <Link to="/profile" className="shrink-0 transition-opacity hover:opacity-80">
                            <img
                                src="https://i.pravatar.cc/40?img=12"
                                alt="User profile"
                                className="w-10 h-10 rounded-full border border-gray-100"
                            />
                        </Link>
                        <div className="min-w-0">
                            <Link to="/profile" className="block text-sm font-bold text-black truncate hover:underline">
                                Admin User
                            </Link>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest truncate">
                                Super Administrator
                            </p>
                        </div>
                    </div>
                    
                    <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium text-sm group"
                    >
                        <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                            <LogOut size={16} />
                        </div>
                        Logout
                    </Link>
                </div>
            </div>
        </>
    )
}