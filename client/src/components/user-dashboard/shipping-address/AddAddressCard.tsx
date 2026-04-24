import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AddAddressCard = () => {
    return (
        <Link to="/dashboard/addresses"
            className="
        bg-gray-200/60
        rounded-2xl
        h-[220px]
        flex flex-col items-center justify-center
        cursor-pointer
        hover:bg-gray-200
        transition
      "
        >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Plus className="w-5 h-5 text-red-500" />
            </div>

            <p className="mt-4 text-xs font-semibold tracking-widest text-gray-800">
                ADD NEW ADDRESS
            </p>
        </Link>
    );
};

export default AddAddressCard;