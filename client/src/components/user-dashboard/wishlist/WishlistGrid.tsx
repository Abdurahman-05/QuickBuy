import WishlistCard from "./WishlistCard";
import { useCommerceStore } from "../../../store/useCommerceStore";
const WishlistGrid = () => {
    const products = useCommerceStore((state) => state.wishlistItems);
    const moveWishlistToCart = useCommerceStore((state) => state.moveWishlistToCart);
    const removeFromWishlist = useCommerceStore((state) => state.removeFromWishlist);

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 && (
                <div className="text-gray-400 text-sm font-medium">No wishlist items yet.</div>
            )}
            {products.map((product) => (
                <WishlistCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    desc={product.description}
                    onMoveToCart={moveWishlistToCart}
                    onRemove={removeFromWishlist}
                />
            ))}
        </div>
    );
};

export default WishlistGrid;