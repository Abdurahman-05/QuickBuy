import { SlidersHorizontal } from "lucide-react";

interface ProductFilterBarProps {
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
}

export default function ProductFilterBar({ 
    activeCategory, 
    setActiveCategory
}: ProductFilterBarProps) {
    const categoryOptions = ["ALL", "LAPTOPS", "AUDIO", "WEARABLES"];

    return (
        <div className="mb-8 border-y border-gray-200 bg-[#f3f3f3]">
            <div className="flex items-center gap-5 sm:gap-7 px-4 sm:px-6 py-3 overflow-x-auto whitespace-nowrap">
                <div className="flex items-center gap-2.5 pr-5 border-r border-gray-300">
                    <SlidersHorizontal size={15} className="text-gray-700" />
                    <span className="text-[12px] font-black tracking-[0.16em] uppercase text-gray-800">Filter</span>
                </div>
                <div className="flex items-center gap-5 sm:gap-7">
                    {categoryOptions.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative text-[12px] font-black tracking-[0.13em] uppercase transition-colors ${activeCategory === cat ? 'text-black' : 'text-gray-400 hover:text-gray-700'}`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <span className="absolute -bottom-[8px] left-0 right-0 h-[2px] bg-[#e60000] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
