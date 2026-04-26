import ShippingHeader from "../../components/user-dashboard/shipping-address/ShippingHeader";
import AddressGrid from "../../components/user-dashboard/shipping-address/AddressGrid";
import { MapPinPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShippingAddresses = () => {
    const navigate = useNavigate();
    return (
        <div className="relative px-2 sm:px-5 py-2 sm:py-4 min-h-screen">
            <ShippingHeader />
            <AddressGrid />
            <button
                type="button"
                onClick={() => navigate("/dashboard/addresses?new=1")}
                className="
                    fixed
                    bottom-8
                    right-8
                    w-14 h-14
                    bg-gray-900 text-white
                    rounded-full
                    flex items-center justify-center
                    shadow-2xl
                    hover:scale-110
                    active:scale-95
                    transition-all
                    z-50
                "
            >
                <MapPinPlus className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ShippingAddresses;