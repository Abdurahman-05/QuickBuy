import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchHeader: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "All Products";

  return (
    <div className="mb-12">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-3">
        Results for "{query}"
      </h1>
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        48 ITEMS FOUND IN CURATED COLLECTION
      </p>
    </div>
  );
};

export default SearchHeader;
