import ShippingHeader from "../../components/user-dashboard/shipping-address/ShippingHeader";
import AddressGrid from "../../components/user-dashboard/shipping-address/AddressGrid";
import { MapPinPlus } from "lucide-react";
import { Link } from "react-router-dom";

const ShippingAddresses = () => {
    return (
        <div className="relative px-5 py-4 min-h-screen">
            <ShippingHeader />
            <AddressGrid />
            <Link to="/dashboard/settings"
                className="
    fixed
    bottom-6
    right-6
    w-12 h-12
    bg-black text-white
    rounded-full
    flex items-center justify-center
    shadow-lg
    hover:scale-105
    transition
    z-50
  "
            >
                <MapPinPlus className="w-5 h-5" />
            </Link>
        </div>
    );
};

export default ShippingAddresses;