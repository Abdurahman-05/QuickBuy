import React from "react";
import { Home } from "lucide-react";

interface AddressCardProps {
    title: string;
    recipient: string;
    address: string;
    phone: string;
    isPrimary: boolean;
}

const AddressCard: React.FC<AddressCardProps> = ({
    title,
    recipient,
    address,
    phone,
    isPrimary,
}) => {
    return (
        <div
            className="
        relative
        bg-gray-100/40
        border border-gray-100
        rounded-2xl
        p-5 sm:p-7
        shadow-sm
        hover:shadow-md
        transition-all
        min-h-[200px] sm:min-h-[230px]
      "
        >
            {/* PRIMARY BADGE */}
            <div className="h-6">
                {isPrimary && (
                    <span className="bg-gray-900 text-white text-[9px] px-2.5 py-1 rounded-full font-black tracking-widest uppercase">
                        PRIMARY INFO
                    </span>
                )}
            </div>

            {/* ICON */}
            {isPrimary && (
                <div className="absolute top-6 right-6 text-gray-200 pointer-events-none">
                    <Home className="w-12 h-12 opacity-50" />
                </div>
            )}

            {/* TITLE */}
            <h3 className="text-xl sm:text-[25px] font-black text-gray-900 mt-2 sm:mt-3 tracking-tight">
                {title}
            </h3>

            {/* RECIPIENT */}
            <div className="mt-5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Recipient
                </p>
                <p className="text-[13px] text-gray-700 font-medium mt-1">
                    {recipient}
                </p>
            </div>

            {/* ADDRESS */}
            <div className="mt-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Address
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed mt-1">
                    {address}
                </p>
            </div>

            {/* PHONE */}
            <div className="mt-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Phone
                </p>
                <p className="text-[13px] text-gray-600 mt-1">
                    {phone}
                </p>
            </div>
        </div>
    );
};

export default AddressCard;