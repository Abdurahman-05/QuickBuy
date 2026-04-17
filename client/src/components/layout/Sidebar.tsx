import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"

export default function Sidebar() {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Products", icon: Package, path: "/addproduct" },
        { name: "Orders", icon: ShoppingCart, path: "/orders" },
        { name: "Users", icon: Users, path: "/users" },
    ]

    return (
        <>

            {/* MOBILE TOP BAR */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-[70]">
                <h1 className="text-lg font-bold text-red-500">
                    QuickBuy
                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="p-2 active:scale-95 transition"
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
                    >
                        <X />
                    </button>
                </div>

                {/* BRAND */}
                <div className="mb-8 pt-2">
                    <h1 className="text-2xl font-bold text-red-500">
                        QuickBuy
                    </h1>
                    <p className="text-xs text-gray-400 tracking-wide">
                        MANAGEMENT CONSOLE
                    </p>
                </div>

                {/* NAV */}
                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all
                                ${isActive
                                        ? "bg-gray-100 text-black font-medium"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex-1" />

                {/* BOTTOM */}
                <div className="space-y-3">
                    <button className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                        <Plus size={16} />
                        <span className="text-sm font-medium">New Entry</span>
                    </button>

                    <Link
                        to="/support"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition"
                    >
                        <HelpCircle size={18} />
                        Support
                    </Link>

                    <Link
                        to="/setting"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>
                </div>
            </div>
        </>
    )
}