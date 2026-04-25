import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItemCard from "../components/products/ProductItemCard";
import ProductFilterBar from "../components/products/ProductFilterBar";
import ProductPagination from "../components/products/ProductPagination";
import { useProductStore } from "../store/useProductStore";

const ITEMS_PER_PAGE = 12; // 4 columns × 3 rows

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category")?.toUpperCase() || "ALL";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [sortOption, setSortOption] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Sync category with URL param when it changes
  useEffect(() => {
    setActiveCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "ALL") {
      result = result.filter(p => p.category.toUpperCase() === activeCategory);
    }

    switch (sortOption) {
      case "PRICE_LOW_HIGH":
        result.sort((a, b) => a.price - b.price);
        break;
      case "PRICE_HIGH_LOW":
        result.sort((a, b) => b.price - a.price);
        break;
      case "NEWEST":
      default:
        break;
    }

    return result;
  }, [activeCategory, sortOption]);

  // Pagination math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filter/sort changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-12">
        {/* Page Header */}
        <div className="mb-6">
          <p className="text-[#e60000] text-[10px] font-extrabold tracking-[0.15em] uppercase mb-3 text-center md:text-left">
            Collection 2024
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-[35px] sm:text-[45px] md:text-[60px] font-black leading-[1.1] tracking-tight uppercase text-center md:text-left">
              All Products
            </h1>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-[11px] font-black text-black tracking-[0.15em] uppercase">
                Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
              </p>
              <p className="text-[10px] font-bold text-gray-400 tracking-[0.12em] uppercase">
                Collection 2024
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <ProductFilterBar
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          sortOption={sortOption}
          setSortOption={handleSortChange}
        />

        {/* Product Grid — 4 cols × 3 rows */}
        {isLoading && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="py-10 text-center">
            <p className="text-red-500 text-sm font-bold uppercase tracking-widest">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {!isLoading && !error && paginatedProducts.map((product) => (
            <ProductItemCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No products found in this category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

    </div>
  );
}