interface CategoryCardProps {
    category: { name: string; image: string };
}

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="group bg-white p-4 sm:p-6 rounded-2xl w-full text-center shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer flex flex-col items-center">
            
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 shadow-md ring-4 ring-white group-hover:ring-indigo-50 transition-all duration-300">
                <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-indigo-900/10 transition-colors duration-300 pointer-events-none" />
            </div>

            <p className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                {category.name}
            </p>
        </div>
    );
}

export default CategoryCard;