import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SearchPagination: React.FC<SearchPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

      {/* Pages */}
      {pageNumbers.map((page) => (
        <button 
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-full text-[13px] font-bold flex items-center justify-center transition-colors ${
            currentPage === page 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

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
