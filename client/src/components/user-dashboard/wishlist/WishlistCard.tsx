import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface WishlistCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    desc: string;
    onMoveToCart: (id: string) => void;
    onRemove: (id: string) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ id, name, price, image, desc, onMoveToCart, onRemove }) => {
    return (
        <div className="flex flex-col">

            {/* IMAGE CARD */}
            <div
                className="
          relative 
          bg-[#EDEDED] 
          rounded-[18px] 
          h-[170px]
          flex items-center justify-center
          transition-all duration-200
        "
            >
                {/* HEART */}
                <button className="absolute top-3 right-3">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>

                {/* IMAGE */}
                <img
                    src={image}
                    alt={name}
                    className="h-[130px] object-contain"
                />

                {/* PRICE BADGE */}
                <div
                    className="
            absolute bottom-3 left-3 
            bg-white 
            px-2 py-[2px] 
            rounded 
            text-[10px] 
            font-semibold 
            text-gray-800
            shadow-sm
          "
                >
                    ${price.toFixed(2)}
                </div>
            </div>

            {/* INFO */}
            <div className="mt-3">
                <h3 className="text-[11px] tracking-[0.12em] text-gray-900 font-semibold">
                    {name}
                </h3>

                <p className="mt-1.5 text-[12px] text-gray-500 leading-[1.5]">
                    {desc}
                </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-3 flex items-center gap-2">
                <Link to="/cart"
                    onClick={() => onMoveToCart(id)}
                    className="
            bg-black text-white 
            text-[11px] 
            px-4 py-1.5 
            rounded-full 
            hover:bg-gray-900 
            transition
            inline-block
          "
                >
                    MOVE TO CART
                </Link>

                <button
                    onClick={() => onRemove(id)}
                    className="
            w-8 h-8 
            flex items-center justify-center 
            rounded-full 
            border border-gray-300 
            hover:bg-gray-200 
            transition
          "
                >
                    <Trash2 className="w-3.5 h-3.5 text-gray-600" />
                </button>
            </div>

        </div>
    );
};

export default WishlistCard;