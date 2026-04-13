interface PromoCardProps {
    promo: { title: string; description: string; image: string };
}

function PromoCard({ promo }: PromoCardProps) {
    return (
        <article className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 flex flex-col-reverse sm:flex-row items-center justify-between w-full shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"/>

            {/* Text Content */}
            <div className="relative z-10 w-full sm:w-[55%] mt-6 sm:mt-0 flex flex-col text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                    {promo.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed bg-white/40 backdrop-blur-sm sm:bg-transparent rounded-lg sm:rounded-none">
                    {promo.description}
                </p>
                <div className="mt-auto">
                    <button className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group/btn">
                        Explore Collection
                        <span className="ml-2 inline-block transform group-hover/btn:translate-x-1 transition-transform duration-200">
                            &rarr;
                        </span>
                    </button>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative z-10 w-full sm:w-[150px] aspect-square flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50 shrink-0 shadow-inner group-hover:shadow-md transition-shadow">
                <img
                    src={promo.image}
                    alt={promo.title}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>
            
        </article>
    );
}

export default PromoCard;