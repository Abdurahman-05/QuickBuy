import ProductsNavbar from "../components/dashboard-products/ProductsNavbar"
import ProductsHeader from "../components/dashboard-products/ProductsHeader"
import ProductsSearchFilter from "../components/dashboard-products/ProductsSearchFilter"
import ProductsTable from "../components/dashboard-products/ProductsTable"
import Sidebar from "../components/layout/Sidebar"
import ProductsPaginationFooter from "@/components/dashboard-products/ProductsPaginationFooter"
import { useEffect, useMemo, useState } from "react"
import { useProductStore } from "../store/useProductStore"

export default function AdminProducts() {
    const products = useProductStore((state) => state.products)
    const getAllProducts = useProductStore((state) => state.getAllProducts)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 12

    useEffect(() => {
        getAllProducts()
    }, [getAllProducts])

    const filteredProducts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return products
        return products.filter((p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q)
        )
    }, [products, searchQuery])

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize)

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
                    <ProductsSearchFilter
                        value={searchQuery}
                        onChange={(value) => {
                            setSearchQuery(value)
                            setCurrentPage(1)
                        }}
                    />
                    <ProductsTable products={paginatedProducts} />
                    <ProductsPaginationFooter
                        currentPage={safePage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        totalItems={filteredProducts.length}
                        onPageChange={setCurrentPage}
                    />
                </div>

            </div>
        </div>
    )
}
