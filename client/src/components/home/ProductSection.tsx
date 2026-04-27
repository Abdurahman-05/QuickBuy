import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import { useCommerceStore } from '../../store/useCommerceStore';
import { useAuthStore } from '../../store/useAuthStore';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const navigate = useNavigate();
  const addToCart = useCommerceStore((state) => state.addToCart);
  const addToWishlist = useCommerceStore((state) => state.addToWishlist);
  const isInWishlist = useCommerceStore((state) => state.isInWishlist);
  const cartItems = useCommerceStore((state) => state.cartItems);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => {
          const thumbnail = product.images?.find((img) => Boolean(img)) || product.image;
          const quantityInCart =
            cartItems.find((item) => item.id === product.id)?.quantity ?? 0;
          return (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="group relative bg-[#efefef] rounded-lg p-5 flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-white/40 cursor-pointer"
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
            <div className="w-full aspect-square mb-4 flex items-center justify-center relative bg-white/40 rounded-md overflow-hidden group-hover:shadow-sm transition-shadow duration-300">
              <img
                src={thumbnail}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <Link
                to={isAuthenticated ? "/dashboard/wishlist" : "/login"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isAuthenticated) return;
                  addToWishlist(product);
                }}
                className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-gray-700 hover:text-red-500 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Add to wishlist"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </svg>
              </Link>
            </div>

            {/* Content Bottom */}
            <div className="flex flex-col gap-1.5 px-0.5 flex-1">
              <h3 className="text-[12px] md:text-[13px] font-bold text-black tracking-wide uppercase line-clamp-1">
                {product.name}
              </h3>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-1.5 mb-1 text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-[0.08em] uppercase">
                <div className="flex text-[#f9d342] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < 5 ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="hidden sm:inline">•</span>
                <span className="shrink-0">{product.stockInfo}</span>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-3 border-t border-gray-200/50">
                <p className="text-sm md:text-base lg:text-lg font-black text-gray-900 tracking-tighter">
                  ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAuthenticated) {
                      navigate("/login");
                      return;
                    }
                    addToCart(product, 1);
                  }}
                  className="flex items-center justify-center gap-2 bg-[#1b1b1b] hover:bg-[#e60000] text-white rounded-full transition-all duration-300 w-full h-8 sm:h-9 relative overflow-hidden group/btn shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(230,0,0,0.23)] hover:-translate-y-0.5 active:scale-95 px-3"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Add to cart
                  </span>
                  {isAuthenticated && quantityInCart > 0 && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-black tracking-wide text-white ring-1 ring-white/35 backdrop-blur-sm transition-all duration-300 group-hover/btn:bg-white/20 group-hover/btn:scale-105">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      x{quantityInCart}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
};

export default ProductSection;
