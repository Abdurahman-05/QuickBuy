import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Bell, Settings, LogOut, Search, Menu, X } from "lucide-react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    // prevent background scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto"
    }, [open])

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
                        <Link to="/overview" className="relative font-medium text-black">
                            Overview
                            <span className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2"></span>
                        </Link>

                        <Link to="/analytics" className="text-gray-500 hover:text-black transition">
                            Analytics
                        </Link>

                        <Link to="/inventory" className="text-gray-500 hover:text-black transition">
                            Inventory
                        </Link>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 lg:gap-4">

                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="pl-9 pr-3 py-2 w-48 lg:w-64 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Bell size={18} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                        <Settings size={18} />
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-gray-700">
                        <LogOut size={16} />
                        <span className="hidden sm:inline text-sm">Logout</span>
                    </button>

                    <img
                        src="https://i.pravatar.cc/40?img=12"
                        alt="User avatar"
                        className="w-9 h-9 rounded-full object-cover border"
                    />
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
                    <Link onClick={() => setOpen(false)} to="/overview">Overview</Link>
                    <Link onClick={() => setOpen(false)} to="/analytics">Analytics</Link>
                    <Link onClick={() => setOpen(false)} to="/inventory">Inventory</Link>
                </div>

                {/* PUSH BOTTOM SECTION */}
                <div className="flex-1" />

                <button className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </>
    )
}