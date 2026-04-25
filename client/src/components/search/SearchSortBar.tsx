import React from "react";
import { ChevronDown } from "lucide-react";

interface SearchSortBarProps {
  sortParam: string;
  onChange: (value: string) => void;
  totalItems: number;
}

const SearchSortBar: React.FC<SearchSortBarProps> = ({ sortParam, onChange, totalItems }) => {

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50/80 rounded-2xl px-6 py-4 mb-8">
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-4 sm:mb-0">
        Showing {totalItems} result{totalItems === 1 ? "" : "s"}
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
          Sort By
        </span>
        <div className="relative">
          <select
            value={sortParam}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-transparent pr-6 text-[11px] font-bold text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
          <ChevronDown size={14} className="text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;
