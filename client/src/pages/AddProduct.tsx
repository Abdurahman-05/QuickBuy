import Sidebar from "@/components/layout/Sidebar"
import ProductNavbar from "@/components/ui/ProductNavbar"
import ProductForm from "@/components/dashboard-products/addproduct/ProductForm"

export default function AddProduct() {
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] w-full overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0 mt-16 lg:mt-0">

                {/* NAVBAR */}
                <ProductNavbar />

                {/* CONTENT */}
                <div className="
                    w-full
                    px-4 sm:px-6 lg:px-10
                    py-5 sm:py-6 lg:py-8
                ">
                    <div className="max-w-5xl w-full mx-auto">
                        <ProductForm />
                    </div>
                </div>

            </div>
        </div>
    )
}