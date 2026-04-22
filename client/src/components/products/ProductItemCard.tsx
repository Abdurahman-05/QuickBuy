import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';

interface ProductItemCardProps {
    product: Product;
}

export default function ProductItemCard({ product }: ProductItemCardProps) {
    // Generate a sleek subtitle based on specs or category to match the design
    const subtitle = product.specifications && product.specifications.length > 0 
        ? product.specifications.map(s => s.value).join(' / ') 
        : `${product.category} / PREMIUM QUALITY`;

    return (
        <Link to={`/products/${product.id}`} className="group cursor-pointer flex flex-col gap-5 drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
        </Link>
    );
}
