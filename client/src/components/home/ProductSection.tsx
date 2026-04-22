import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Product } from '../../data/products';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <Link to="/products" className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-[#e60000] transition-colors flex items-center gap-1 group">
          View All Products
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="group relative bg-[#efefef] rounded-lg p-5 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-white/50 cursor-pointer"
          >
            {/* Rectangular Yellow Recommended Badge */}
            {product.recommended && (
              <div className="absolute top-0 right-0 z-10">
                <div className="bg-[#f9d342] text-[#1b1b1b] text-[8px] font-bold px-3 py-1.5 shadow-sm uppercase tracking-wider">
                  Recommended
                </div>
              </div>
            )}

            {/* Product Image Area */}
            <div className="w-full aspect-square mb-4 flex items-center justify-center relative bg-white/20 rounded-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Content Bottom */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-[12px] font-bold text-gray-900 line-clamp-2 h-9 mb-2 leading-tight tracking-tight">
                {product.name}
              </h3>
              
              <div className="mt-auto space-y-2.5">
                {/* Rating & Stock */}
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#f9d342] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < 5 ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter shrink-0">
                    {product.stockInfo}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 tracking-tighter">
                    ${product.price.toFixed(2)}
                  </p>
                  
                  {/* Modern Hover Feature: "+" icon expands to "Add to cart" ONLY ON BUTTON HOVER */}
                  <Link 
                    to="/cart"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center bg-[#1b1b1b] text-white rounded-full transition-all duration-500 overflow-hidden w-8 hover:w-[160px] h-8 relative group/btn"
                  >
                    <div className="absolute inset-0 flex items-center justify-center w-8 shrink-0">
                      <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="ml-[36px] text-[10px] font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      Add to cart
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
