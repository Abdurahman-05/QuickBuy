import type { Product } from "../../types/product";

interface CustomerReviewsProps {
  product: Product;
}

const CustomerReviews = ({ product }: CustomerReviewsProps) => {
  return (
    <div className="pt-16 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Product feedback
          </h2>
          <p className="text-gray-500 font-medium">Real experiences from our global community.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100">
           <div className="text-center">
              <p className="text-3xl font-black text-black leading-none">{product.rating}.0</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Average</p>
           </div>
           <div className="h-10 w-[1px] bg-gray-100" />
           <div className="text-center">
              <p className="text-3xl font-black text-black leading-none">{product.reviews.length}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Reviews</p>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                 <img 
                   src={review.avatar || `https://i.pravatar.cc/150?u=${review.author}`} 
                   alt={review.author}
                   className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50"
                 />
                 <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{review.author}</h3>
                    <div className="flex text-amber-400 text-xs">
                       {"★".repeat(review.rating)}
                       <span className="text-gray-200">{"★".repeat(5 - review.rating)}</span>
                    </div>
                 </div>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed italic">"{review.text}"</p>
              <div className="mt-auto pt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 Verified Purchaser
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No reviews yet for this product. Be the first to share your experience!</p>
            <button className="mt-4 text-sm font-black text-red-500 uppercase tracking-widest hover:text-red-600">Write a review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;