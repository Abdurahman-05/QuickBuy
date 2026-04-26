interface ProductsPaginationFooterProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export default function ProductsPaginationFooter({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
}: ProductsPaginationFooterProps) {
    const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    return (
        <div className="w-full px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* LEFT TEXT */}
            <span className="text-sm text-gray-400">
                Showing <span className="text-gray-700 font-medium">{start}–{end}</span> of {totalItems} products
            </span>

            {/* PAGINATION */}
            <div className="flex items-center gap-2">

                {/* PREV */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center transition ${currentPage === page
                            ? "bg-black text-white shadow-sm"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* NEXT */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ›
                </button>

            </div>
        </div>
    )
}