import { useState, useRef, useEffect } from 'react';
import { AlignLeft, ChevronDown, Check } from 'lucide-react';

interface ProductFilterBarProps {
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
    categories?: string[];
}

export default function ProductFilterBar({ 
    activeCategory, 
    setActiveCategory, 
    sortOption, 
    setSortOption,
    categories = []
}: ProductFilterBarProps) {
    const categoryOptions = ["ALL", ...categories];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sortOptions = [
        { id: 'NEWEST', label: 'Newest' },
        { id: 'PRICE_LOW_HIGH', label: 'Price: Low to High' },
        { id: 'PRICE_HIGH_LOW', label: 'Price: High to Low' }
    ];

    const currentSortLabel = sortOptions.find(o => o.id === sortOption)?.label || 'Newest';

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 sm:py-8 border-b border-gray-100 mb-10 relative">
            {/* Left side: Filter & Categories */}
            <div className="flex items-center gap-6 md:gap-10 flex-wrap">
                {/* Filter Icon */}
                <button className="flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-black hover:text-red-600 transition-colors">
                    <AlignLeft size={16} strokeWidth={2.5} />
                    <span>Filter</span>
                </button>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[1px] h-4 bg-gray-200" />

                {/* Categories */}
                <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
                    {categoryOptions.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative text-[11px] font-extrabold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${activeCategory === cat ? 'text-black scale-105' : 'text-gray-400 hover:text-black'}`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <span className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-[#e60000] rounded-full transition-all duration-300" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right side: Modern Sort Dropdown */}
            <div className="flex items-center relative" ref={dropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.1em] text-black uppercase hover:text-red-500 transition-colors focus:outline-none"
                >
                    <span>Sort By: <span className="text-gray-500 group-hover:text-red-400">{currentSortLabel}</span></span>
                    <ChevronDown size={14} strokeWidth={2.5} className={`mt-0.5 text-black transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute top-8 right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden text-[11px] font-bold tracking-widest uppercase animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-1">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSortOption(option.id);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                                        sortOption === option.id 
                                            ? 'bg-red-50 text-red-600' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                    }`}
                                >
                                    {option.label}
                                    {sortOption === option.id && <Check size={14} strokeWidth={3} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
