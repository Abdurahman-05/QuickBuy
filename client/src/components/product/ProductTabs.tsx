import type { Product } from "../../types/product";

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-sm border border-gray-100">
      {/* Tabs Header */}
      <div className="flex gap-12 border-b border-gray-100 pb-0 text-sm uppercase tracking-[0.2em] font-black overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button className="border-b-4 border-red-500 pb-5 text-black">
          Description
        </button>
        <button className="text-gray-300 pb-5 hover:text-gray-500 transition-colors">Specifications</button>
        <button className="text-gray-300 pb-5 hover:text-gray-500 transition-colors">Customer Reviews</button>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-5 gap-16 mt-12">

        {/* LEFT: Rich Description */}
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-3xl font-black text-black leading-tight">
            Detailed Overview
          </h2>

          <div className="prose prose-lg text-gray-600 leading-relaxed font-medium">
            <p className="mb-6">
              {product.description}
            </p>
            <p>
              Engineered for the discerning user, this category-leading {product.category} device 
              sets a new benchmark in industrial design and performance. Every component has been 
              meticulously analyzed to ensure peak efficiency.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4">
             <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
                <p className="text-xl font-black mb-1">Premium Build</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Materials & Sourcing</p>
             </div>
             <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100/50">
                <p className="text-xl font-black mb-1">Eco-Friendly</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Sustainability</p>
             </div>
          </div>
        </div>

        {/* RIGHT: Technical Specifications */}
        <div className="lg:col-span-2 space-y-6 bg-gray-50/50 p-8 rounded-[24px] border border-gray-100">
          <h3 className="text-xl font-black uppercase tracking-widest items-center flex gap-3">
             <span className="w-8 h-1 bg-red-500 rounded-full" />
             Tech Specs
          </h3>
          <div className="space-y-4">
            {product.specifications.length > 0 ? (
               product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200/50 pb-4"
                >
                  <span className="text-gray-400 uppercase text-[10px] font-black tracking-widest">
                    {spec.label}
                  </span>
                  <span className="font-bold text-gray-900">{spec.value}</span>
                </div>
              ))
            ) : (
                <p className="text-sm text-gray-400 italic">Contact support for full technical documentation.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;