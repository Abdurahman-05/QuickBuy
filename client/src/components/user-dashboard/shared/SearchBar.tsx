import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search orders...",
  className = "",
  onChange,
}) => {
  return (
    <div className={`relative w-full ${className}`}>

      {/* Icon */}
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <Input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="
          h-10
          pl-9 pr-4
          text-sm
          bg-white
          border border-gray-200
          rounded-xl
          placeholder:text-gray-400
          focus-visible:ring-1
          focus-visible:ring-gray-300
          focus-visible:border-gray-300
          transition-all
        "
      />
    </div>
  );
};

export default SearchBar;