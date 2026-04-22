import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const AddressCard: React.FC = () => {
  return (
    <div>
      {/* Section Title */}
      <h2 className="text-base font-bold text-gray-900 mb-4">
        Primary Address
      </h2>

      {/* Address Card */}
      <div className="bg-gray-100 border border-gray-200/60 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-gray-200">

        {/* HOME Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
            <Home size={12} className="text-gray-500" strokeWidth={2} />
            <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
              Home
            </span>
          </div>
        </div>

        {/* Address Content */}
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-900">
            Alex Johnson
          </p>

          <div className="text-[13px] text-gray-500 leading-relaxed">
            <p>482 Tech Valley Boulevard</p>
            <p>Suite 405</p>
            <p>San Francisco, CA 94103</p>
          </div>
        </div>

        {/* Edit Button */}
        <Link to="/dashboard/addresses" className="mt-5 inline-block text-[11px] font-bold text-red-500 hover:text-red-600 tracking-[0.08em] uppercase transition-colors underline decoration-red-600">
          Edit Address
        </Link>
      </div>
    </div>
  );
};

export default AddressCard;