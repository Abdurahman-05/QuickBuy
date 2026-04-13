interface ProductCardProps {
    product: {
        name: string;
        image: string;
        stock: number;
        rating: number;
        price?: number;
    };
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="group bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full flex flex-col relative cursor-pointer">
            
            {/* Added a subtle badge for out of stock or sale */}
            {product.stock === 0 && (
                <div className="absolute top-6 right-6 z-10 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-sm">
                    Sold Out
                </div>
            )}

            {/* Image */}
            <div className="w-full aspect-[4/3] sm:aspect-square flex flex-col items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-4 relative z-0">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
                    }}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>

                {/* Rating - using SVGs for cleaner stars but keeping text for simplicity here */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="text-amber-400 text-sm tracking-widest flex">
                        {"★".repeat(product.rating)}
                        <span className="text-gray-200">
                            {"★".repeat(5 - product.rating)}
                        </span>
                    </div>
                </div>

                {/* Stock info */}
                <p className={`text-xs font-medium mb-3 mt-auto ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {product.stock > 0
                        ? `${product.stock} pair left in stock`
                        : "Out of stock"}
                </p>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <p className="font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight">
                        ${product.price?.toFixed(2)}
                    </p>
                    <button 
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                        aria-label="Add to cart"
                    >
                        <span className="text-lg leading-none mb-1">+</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;