import { Link } from 'react-router-dom';

interface CategoryCardProps {
    label: string;
    title: string;
    image: string;
    linkText?: string;
    linkTo: string;
    wide?: boolean;
    bgColor?: string;
}

export default function CategoryCard({ label, title, image, linkText, linkTo, wide, bgColor = '#f5f5f5' }: CategoryCardProps) {
    const isExternal = image.includes('unsplash.com') || image.startsWith('http');

    return (
        <Link
            to={linkTo}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg min-h-[280px] sm:min-h-[320px] ${
                wide ? 'col-span-1 sm:col-span-2' : ''
            }`}
            style={{ backgroundColor: bgColor }}
        >
            {/* Top: Text content */}
            <div className="relative z-10 p-5 sm:p-6 md:p-8 pb-2">
                <p className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] uppercase text-gray-400 mb-1">
                    {label}
                </p>
                <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight leading-tight text-black">
                    {title}
                </h3>
            </div>

            {/* Image area */}
            <div className={`relative w-full overflow-hidden flex-1 min-h-[160px] sm:min-h-[180px] ${wide ? 'md:min-h-[220px]' : ''}`}>
                <img
                    src={image}
                    alt={title}
                    className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isExternal ? 'object-cover' : 'object-contain p-4 sm:p-6'
                    }`}
                />
            </div>

            {/* Bottom link text — black text with red underline */}
            {linkText && (
                <div className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-1.5">
                    <span className="relative text-[10px] sm:text-[11px] font-extrabold tracking-[0.1em] uppercase text-black">
                        {linkText}
                        <span className="absolute -bottom-[3px] left-0 w-full h-[2px] bg-[#e60000] rounded-full" />
                    </span>
                    <span className="text-black text-xs ml-0.5 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
            )}
        </Link>
    );
}
