import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../shared/StatusBadge";

interface OrderCardProps {
  orderId: string;
  productId?: string;
  productName: string;
  image: string;
  status: string;
  price: string;
  date: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  productId,
  productName,
  image,
  status,
  price,
  date,
}) => {
  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-gray-200 group">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">

        {/* Product Image */}
        <Link
          to={productId ? `/products/${productId}` : "/products"}
          className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300"
        >
          <img src={image} alt={productName} className="w-full h-full object-cover" />
        </Link>

        {/* Order Details */}
        <div className="flex-1 min-w-0">
          {/* Order ID + Status Badge */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-bold text-gray-400 tracking-wide">
              {orderId}
            </span>
            <StatusBadge status={status} />
          </div>

          {/* Product Name */}
          <Link
            to={productId ? `/products/${productId}` : "/products"}
            className="text-[15px] font-bold text-gray-900 leading-snug mb-1 truncate hover:text-red-500 transition-colors block"
          >
            {productName}
          </Link>

          {/* Date */}
          <Link to={productId ? `/products/${productId}` : "/products"} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
            Ordered on {date}
          </Link>
        </div>

        {/* Price + Action */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto flex-shrink-0">
          <p className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
            {price}
          </p>
          <Link
            to={productId ? `/products/${productId}` : "/products"}
            className="text-[11px] font-bold text-gray-900 tracking-wider uppercase hover:text-red-500 transition-colors underline decoration-1 underline-offset-2"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderCard;
