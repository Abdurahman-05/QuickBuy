import ProductsNavbar from "../components/dashboard-products/ProductsNavbar"
import ProductsHeader from "../components/dashboard-products/ProductsHeader"
import ProductsSearchFilter from "../components/dashboard-products/ProductsSearchFilter"
import ProductsTable from "../components/dashboard-products/ProductsTable"
import Sidebar from "../components/layout/Sidebar"
import ProductsPaginationFooter from "@/components/dashboard-products/ProductsPaginationFooter"
export default function Products() {
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] w-full overflow-x-hidden">


            <Sidebar />


            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col min-w-0 w-full">

                {/* NAVBAR */}
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
                    <ProductsNavbar />
                </div>

                {/* PAGE CONTENT */}
                <div className="pb-16 sm:pb-20">

                    <ProductsHeader />
                    <ProductsSearchFilter />
                    <ProductsTable />
                    <ProductsPaginationFooter />
                </div>

            </div>
        </div>
    )
}