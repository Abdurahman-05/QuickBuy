import React from "react";
import SearchProductCard from "./SearchProductCard";
import type { Product } from "../../types/product";

interface SearchGridProps {
  products: Product[];
}

const SearchGrid: React.FC<SearchGridProps> = ({ products }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <SearchProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          price={`$${product.price.toFixed(2)}`}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default SearchGrid;
