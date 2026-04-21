import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SearchPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const pageNumbers = [1, 2, 3];

  return (
    <div className="flex items-center justify-center gap-3 mt-16 pb-16">
      {/* Prev Button */}
      <button 
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          currentPage === 1 ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      {/* Pages 1-3 */}
      {pageNumbers.map((page) => (
        <button 
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${
            currentPage === page 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <span className="text-gray-400 text-sm font-bold tracking-widest px-1">...</span>

      {/* Page 4 (Last) */}
      <button 
        onClick={() => setCurrentPage(4)}
        className={`w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${
          currentPage === 4 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        4
      </button>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
          currentPage === totalPages ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SearchPagination;
