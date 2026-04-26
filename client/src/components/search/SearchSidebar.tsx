import React, { useState } from "react";
import { Star } from "lucide-react";

const CheckboxOption = ({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) => {

  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group select-none"
      onClick={onToggle}
    >
      <div
        className={`w-[18px] h-[18px] rounded flex items-center justify-center transition-colors border ${
          checked
            ? "bg-gray-900 border-gray-900 text-white"
            : "bg-gray-100 border-transparent group-hover:border-gray-300"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 3.5L3.5 6L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[11px] font-bold tracking-widest uppercase text-gray-700 hover:text-gray-900">
        {label}
      </span>
    </div>
  );
};

interface SearchSidebarProps {
  selectedPriceRanges: string[];
  selectedBrands: string[];
  minRating: number | null;
  finish: string | null;
  brandOptions: string[];
  onTogglePriceRange: (range: string) => void;
  onToggleBrand: (brand: string) => void;
  onToggleRating: () => void;
  onSetFinish: (finish: string | null) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  selectedPriceRanges,
  selectedBrands,
  minRating,
  finish,
  brandOptions,
  onTogglePriceRange,
  onToggleBrand,
  onToggleRating,
  onSetFinish,
}) => {
  const [activeFinish, setActiveFinish] = useState<string | null>(null);
  const ratingActive = minRating !== null;
  const resolvedFinish = finish ?? activeFinish;

  return (
    <aside className="w-full lg:w-56 flex-shrink-0 mb-12 lg:mb-0">
      
      {/* PRICE RANGE */}
      <div className="mb-10">
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-5">
          Price Range
        </h3>
        <div className="flex flex-col gap-4">
          <CheckboxOption label="$0 - $100" checked={selectedPriceRanges.includes("0-100")} onToggle={() => onTogglePriceRange("0-100")} />
          <CheckboxOption label="$100 - $500" checked={selectedPriceRanges.includes("100-500")} onToggle={() => onTogglePriceRange("100-500")} />
          <CheckboxOption label="$500+" checked={selectedPriceRanges.includes("500+")} onToggle={() => onTogglePriceRange("500+")} />
        </div>
      </div>

      {/* BRAND */}
      <div className="mb-10">
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-5">
          Brand
        </h3>
        <div className="flex flex-col gap-4">
          {brandOptions.length > 0 ? brandOptions.map((brand) => (
            <CheckboxOption
              key={brand}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onToggle={() => onToggleBrand(brand)}
            />
          )) : <span className="text-xs text-gray-400">No brands available</span>}
        </div>
      </div>

      {/* RATING */}
      <div className="mb-10">
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-5">
          Rating
        </h3>
        <button 
          className="flex items-center gap-2 group focus:outline-none"
          onClick={onToggleRating}
        >
          <Star 
            size={14} 
            className={`transition-colors ${ratingActive ? 'fill-gray-900 text-gray-900' : 'text-gray-400'}`} 
          />
          <span className={`text-[11px] font-bold tracking-widest uppercase transition-colors ${ratingActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
            4.5 & Up
          </span>
        </button>
      </div>

      {/* FINISH/COLOR */}
      <div>
        <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-5">
          Finish
        </h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const next = resolvedFinish === 'black' ? null : 'black';
              setActiveFinish(next);
              onSetFinish(next);
            }}
            className={`w-6 h-6 rounded-full bg-black focus:outline-none transition-all ${resolvedFinish === 'black' ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`} 
            aria-label="Black"
          />
          <button 
            onClick={() => {
              const next = resolvedFinish === 'gray' ? null : 'gray';
              setActiveFinish(next);
              onSetFinish(next);
            }}
            className={`w-6 h-6 rounded-full bg-gray-500 focus:outline-none transition-all ${resolvedFinish === 'gray' ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`} 
            aria-label="Dark Gray"
          />
          <button 
            onClick={() => {
              const next = resolvedFinish === 'lightGray' ? null : 'lightGray';
              setActiveFinish(next);
              onSetFinish(next);
            }}
            className={`w-6 h-6 rounded-full bg-gray-200 focus:outline-none transition-all ${resolvedFinish === 'lightGray' ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`} 
            aria-label="Light Gray"
          />
          <button 
            onClick={() => {
              const next = resolvedFinish === 'white' ? null : 'white';
              setActiveFinish(next);
              onSetFinish(next);
            }}
            className={`w-6 h-6 rounded-full bg-white border border-gray-200 focus:outline-none transition-all ${resolvedFinish === 'white' ? 'ring-2 ring-offset-2 ring-gray-900 border-transparent' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`} 
            aria-label="White"
          />
        </div>
      </div>

    </aside>
  );
};

export default SearchSidebar;
