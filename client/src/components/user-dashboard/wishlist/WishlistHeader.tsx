import { useCommerceStore } from "../../../store/useCommerceStore";

const WishlistHeader = () => {
    const count = useCommerceStore((state) => state.wishlistCount());
    return (
        <div>
            <h1 className="text-3xl md:text-[40px] font-medium text-gray-700 leading-[1.1]">
                CURATED <br /> DESIRES.
            </h1>

            <p className="mt-3 text-sm text-gray-500 max-w-md leading-relaxed">
                Your personal selection of high-end electronics. These pieces are saved
                for your consideration and ready for acquisition.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-400 font-bold">
                {count} item{count === 1 ? "" : "s"} saved
            </p>
        </div>
    );
};

export default WishlistHeader;