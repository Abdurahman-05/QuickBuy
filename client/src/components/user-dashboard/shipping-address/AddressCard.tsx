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
        bg-gray-200/30
        rounded-2xl
        p-7
        shadow-sm
        hover:shadow-md
        transition
        min-h-[230px]
      "
        >
            {/* PRIMARY BADGE */}
            <div className="h-6">
                {isPrimary && (
                    <span className="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full font-semibold tracking-wide">
                        PRIMARY DELIVERY
                    </span>
                )}
            </div>

            {/* ICON */}
            {isPrimary && (
                <div className="absolute bottom-2 right-3 text-gray-300">
                    <Home className="w-20 h-20 opacity-70" />
                </div>
            )}

            {/* TITLE */}
            <h3 className="text-[25px] font-bold text-gray-900 mt-2">
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