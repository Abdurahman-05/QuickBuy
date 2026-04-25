import WishlistCard from "./WishlistCard";
import Watch from "../../../assets/Smartwatch.svg"
import Earbud from "../../../assets/Pro Earbuds Nano.svg"
import Cinema from "../../../assets/Cinema Hub 4K.svg"
const WishlistGrid = () => {
    const products = [
        {
            id: 1,
            name: "ACTIVE SMARTWATCH",
            price: "$349.00",
            image: Watch,
            desc: "The pinnacle of wearable tech. Titanium casing with advanced bio-tracking.",
        },
        {
            id: 2,
            name: "PRO EARBUDS NANO",
            price: "$199.00",
            image: Earbud,
            desc: "Spatial audio redefined. 40db active noise cancellation in a weightless form.",
        },
        {
            id: 3,
            name: "CINEMA HUB 4K",
            price: "$599.00",
            image: Cinema,
            desc: "High-fidelity media processing. Supporting 8K passthrough and tactile audio.",
        },
    ];

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <WishlistCard key={product.id} {...product} />
            ))}
        </div>
    );
};

export default WishlistGrid;