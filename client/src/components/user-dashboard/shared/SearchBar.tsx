import React from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search items...",
  className = "",
  onChange,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative w-full group ${className}`}
    >

      {/* Icon */}
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors z-10 pointer-events-none"
      />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e);
        }}
        placeholder={placeholder}
        className="
          w-full
          h-11
          pl-11 pr-4
          text-[13px]
          font-medium
          bg-gray-100/50
          border border-transparent
          rounded-2xl
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-4
          focus:ring-red-600/5
          focus:border-red-600/30
          focus:bg-white
          transition-all
          duration-300
        "
      />
    </form>
  );
};

export default SearchBar;