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
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
        if (totalPages <= 7) return true;
        if (page === 1 || page === totalPages) return true;
        return Math.abs(page - safeCurrentPage) <= 1;
    });

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
                    onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
                    disabled={safeCurrentPage === 1}
                    className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ‹
                </button>

                {pageNumbers.map((page, index) => {
                    const previous = pageNumbers[index - 1];
                    const showLeftEllipsis = previous && page - previous > 1;
                    return (
                        <div key={page} className="flex items-center gap-2">
                            {showLeftEllipsis && (
                                <span className="text-xs text-gray-400 px-1">...</span>
                            )}
                            <button
                                onClick={() => onPageChange(page)}
                                className={`h-9 w-9 rounded-full flex items-center justify-center transition ${safeCurrentPage === page
                                    ? "bg-black text-white shadow-sm"
                                    : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        </div>
                    );
                })}

                {/* NEXT */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
                    disabled={safeCurrentPage === totalPages || totalPages === 0}
                    className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ›
                </button>

            </div>
        </div>
    )
}