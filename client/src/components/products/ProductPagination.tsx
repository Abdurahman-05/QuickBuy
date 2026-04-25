import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function ProductPagination({ currentPage, totalPages, onPageChange }: ProductPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-20 mb-10">
            {/* Previous */}
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                    currentPage === 1
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-gray-400 hover:text-black'
                }`}
            >
                <ArrowLeft size={12} strokeWidth={2.5} />
                <span>Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-4 sm:gap-6">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`relative text-[10px] sm:text-[11px] font-extrabold tracking-widest transition-all duration-300 ${
                            currentPage === page ? 'text-black scale-110' : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        {String(page).padStart(2, '0')}
                        {currentPage === page && (
                            <span className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-[#e60000] rounded-full transition-all duration-300" />
                        )}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                    currentPage === totalPages
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-gray-400 hover:text-black'
                }`}
            >
                <span>Next</span>
                <ArrowRight size={12} strokeWidth={2.5} />
            </button>
        </div>
    );
}
