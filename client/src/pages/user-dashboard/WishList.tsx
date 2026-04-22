import React from "react";
import WishlistHeader from "../../components/user-dashboard/wishlist/WishlistHeader";
import WishlistGrid from "../../components/user-dashboard/wishlist/WishlistGrid";

const Wishlist: React.FC = () => {
    return (
        <div className="bg-gray-100/50 min-h-screen">

            {/* CENTERED CONTENT */}
            <div className="max-w-5xl mx-auto px-6 py-1">
                <WishlistHeader />
                <WishlistGrid />
            </div>

        </div>
    );
};

export default Wishlist;