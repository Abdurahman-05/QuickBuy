import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductsHeader() {
    const navigate = useNavigate()

    return (
        <div className="w-full px-4 sm:px-6 mt-6 sm:mt-8">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">

                {/* LEFT: TITLE + DESCRIPTION */}
                <div>

                    <h1 className="text-[28px] sm:text-[34px] lg:text-[42px] font-extrabold tracking-tight text-black">
                        Products
                    </h1>

                    <p className="text-gray-500 mt-1.5 sm:mt-2 max-w-sm sm:max-w-md text-xs sm:text-sm lg:text-base">
                        Curating the finest electronics and digital tools for the
                        modern workspace.
                    </p>

                </div>

                {/* RIGHT: ADD PRODUCT BUTTON */}
                <div className="flex justify-start lg:justify-end w-full lg:w-auto">

                    <button
                        onClick={() => navigate("/addproduct")}
                        className="
                            flex items-center justify-center gap-2
                            bg-black text-white
                            px-4 sm:px-5 py-2.5 sm:py-3
                            rounded-full
                            shadow-md hover:shadow-lg
                            transition
                            w-full sm:w-auto
                        "
                    >
                        <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10">
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>

                        <span className="text-xs sm:text-sm font-medium">
                            Add Product
                        </span>
                    </button>

                </div>

            </div>
        </div>
    )
}