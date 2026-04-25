export default function ProductsPaginationFooter() {
    return (
        <div className="w-full px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* LEFT TEXT */}
            <span className="text-sm text-gray-400">
                Showing <span className="text-gray-700 font-medium">1–12</span> of 48 products
            </span>

            {/* PAGINATION */}
            <div className="flex items-center gap-2">

                {/* PREV */}
                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                    ‹
                </button>

                {/* ACTIVE */}
                <button className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center shadow-sm">
                    1
                </button>

                {/* NORMAL */}
                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                    2
                </button>

                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                    3
                </button>

                {/* NEXT */}
                <button className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                    ›
                </button>

            </div>
        </div>
    )
}