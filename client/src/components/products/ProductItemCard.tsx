import { Link, useNavigate } from 'react-router-dom';
import type { Product } from '../../data/products';

interface ProductItemCardProps {
    product: Product;
}

export default function ProductItemCard({ product }: ProductItemCardProps) {
    const navigate = useNavigate();

    // Generate a sleek subtitle based on specs or category to match the design
    const subtitle = product.specifications && product.specifications.length > 0 
        ? product.specifications.map(s => s.value).join(' / ') 
        : `${product.category} / PREMIUM QUALITY`;

    return (
        <div
            onClick={() => navigate(`/products/${product.id}`)}
            className="group cursor-pointer flex flex-col gap-5 drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className={`relative aspect-square w-full bg-[#f6f6f6] overflow-hidden group-hover:shadow-md transition-shadow duration-300`}>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`w-full h-full p-0 transition-transform duration-700 ease-out group-hover:scale-110 ${
                        product.image.includes('unsplash.com') ? 'object-cover' : 'object-contain p-6 mix-blend-multiply'
                    }`}
                />
                
                {/* Floating Price Badge */}
                <div className="absolute left-6 bottom-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[13px] font-black text-black shadow-lg border border-white/40 tracking-tighter">
                    ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </div>

                <Link
                    to="/dashboard/wishlist"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-gray-700 hover:text-red-500 flex items-center justify-center transition-colors"
                    aria-label="Add to wishlist"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                    </svg>
                </Link>
            </div>

            {/* Typography Section */}
            <div className="flex flex-col gap-1.5 px-0.5">
                <h3 className="text-[13px] font-bold text-black tracking-wide uppercase line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium tracking-[0.08em] uppercase line-clamp-1">
                    {subtitle}
                </p>
            </div>

            <div className="mt-auto pt-2">
                <Link
                  to="/cart"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 bg-[#1b1b1b] hover:bg-[#e60000] text-white rounded-full transition-all duration-300 w-full h-8 sm:h-9 relative overflow-hidden group/btn shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(230,0,0,0.23)] hover:-translate-y-0.5 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    Add to cart
                  </span>
                </Link>
            </div>
        </div>
    );
}
