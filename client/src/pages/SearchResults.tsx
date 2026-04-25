import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchHeader from "../components/search/SearchHeader";
import SearchSidebar from "../components/search/SearchSidebar";
import SearchSortBar from "../components/search/SearchSortBar";
import SearchGrid from "../components/search/SearchGrid";
import SearchPagination from "../components/search/SearchPagination";
import { useProductStore } from "../store/useProductStore";

const ITEMS_PER_PAGE = 12;

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortParam, setSortParam] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  useEffect(() => {
    getAllProducts({ search: query || undefined });
    setCurrentPage(1);
  }, [getAllProducts, query]);

  const sortedProducts = useMemo(() => {
    const result = [...products];
    switch (sortParam) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return result;
  }, [products, sortParam]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">

        {/* Header */}
        <SearchHeader query={query || "All Products"} totalItems={sortedProducts.length} />

        {/* Main Layout (Sidebar + Content) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mt-16">

          {/* Sidebar */}
          <SearchSidebar />

          {/* Right Content Area */}
          <div className="flex-1 w-full">
            <SearchSortBar
              sortParam={sortParam}
              onChange={setSortParam}
              totalItems={sortedProducts.length}
            />
            {isLoading && <p className="text-sm font-semibold text-gray-400 mb-8">Loading products...</p>}
            {error && <p className="text-sm font-semibold text-red-500 mb-8">{error}</p>}
            {!isLoading && !error && <SearchGrid products={paginatedProducts} />}
            <SearchPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchResults;
