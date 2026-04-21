import React from "react";
import SearchHeader from "../components/search/SearchHeader";
import SearchSidebar from "../components/search/SearchSidebar";
import SearchSortBar from "../components/search/SearchSortBar";
import SearchGrid from "../components/search/SearchGrid";
import SearchPagination from "../components/search/SearchPagination";

const SearchResults: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">

        {/* Header */}
        <SearchHeader />

        {/* Main Layout (Sidebar + Content) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mt-16">

          {/* Sidebar */}
          <SearchSidebar />

          {/* Right Content Area */}
          <div className="flex-1 w-full">
            <SearchSortBar />
            <SearchGrid />
            <SearchPagination />
          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchResults;
