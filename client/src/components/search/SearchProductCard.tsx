import React from "react";
import { Link } from "react-router-dom";

interface SearchProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  return (
    <Link to={`/products/${id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f4f4f5] flex items-center justify-center p-6 mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain mix-blend-multiply drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white px-2 py-1 shadow-sm">
          <span className="text-[10px] font-bold text-gray-900 tracking-wider">
            {price}
          </span>
        </div>
      </div>

      {/* Details */}
      <h3 className="text-[11px] font-bold tracking-[0.1em] text-gray-900 uppercase">
        {name}
      </h3>
      <p className="text-[11px] text-gray-500 mt-1">
        {description}
      </p>
    </Link>
  );
};

export default SearchProductCard;
