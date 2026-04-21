import { Bell, Settings, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function UsersHeader() {
    return (
        <div className="
            flex flex-col lg:flex-row
            lg:items-center lg:justify-between
            gap-4
            w-full min-w-0
        ">

            {/* LEFT */}
            <div className="
                flex flex-col sm:flex-row
                sm:items-center
                gap-3 sm:gap-6 lg:gap-8
                min-w-0
            ">

                {/* TITLE */}
                <h1 className="text-lg sm:text-xl font-bold text-black whitespace-nowrap">
                    Users
                </h1>

                {/* TABS */}
                <div className="
                    flex items-center gap-4 sm:gap-6
                    text-xs sm:text-sm
                    overflow-x-auto scrollbar-none
                ">
                    <button className="relative font-medium text-black whitespace-nowrap">
                        Overview
                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1 h-1 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="text-gray-400 hover:text-gray-600 transition whitespace-nowrap">
                        Activity
                    </button>

                    <button className="text-gray-400 hover:text-gray-600 transition whitespace-nowrap">
                        Permissions
                    </button>
                </div>
            </div>

            {/* RIGHT */}
            <div className="
                flex items-center justify-between sm:justify-end
                gap-2 sm:gap-3 lg:gap-4
                flex-wrap
                w-full lg:w-auto
            ">

                {/* SEARCH */}
                <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search product..."
                        className="
                            pl-9 pr-3 py-2
                            w-full sm:w-48 md:w-56 lg:w-64
                            rounded-xl border bg-gray-50
                            text-sm
                            focus:outline-none focus:ring-2 focus:ring-gray-200
                        "
                    />
                </div>

                {/* ICONS */}
                <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                    <Link to="/notifications" className="p-1.5 hover:bg-gray-100 rounded-full transition border border-transparent hover:border-black/5">
                        <Bell className="w-4 h-4 text-gray-400 hover:text-black transition" />
                    </Link>
                    <Link to="/settings" className="p-1.5 hover:bg-gray-100 rounded-full transition border border-transparent hover:border-black/5">
                        <Settings className="w-4 h-4 text-gray-400 hover:text-black transition" />
                    </Link>
                </div>

                {/* DIVIDER (hide on small) */}
                <div className="hidden sm:block w-px h-5 bg-gray-200" />

                {/* LOGOUT */}
                <Link to="/login" className="text-xs sm:text-sm text-gray-500 font-medium hover:text-black hover:underline transition whitespace-nowrap">
                    Logout
                </Link>
            </div>
        </div>
    );
}