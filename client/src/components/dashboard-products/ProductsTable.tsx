import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useProductStore } from "../../store/useProductStore"

export default function ProductsTable() {
    const products = useProductStore((state) => state.products)
    const isLoading = useProductStore((state) => state.isLoading)
    const error = useProductStore((state) => state.error)
    const successMessage = useProductStore((state) => state.successMessage)
    const getAllProducts = useProductStore((state) => state.getAllProducts)
    const updateProduct = useProductStore((state) => state.updateProduct)
    const deleteProduct = useProductStore((state) => state.deleteProduct)

    useEffect(() => {
        getAllProducts()
    }, [getAllProducts])

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id)
        } catch {
            // Error is handled in the product store
        }
    }

    const handleQuickUpdate = async (id: string, currentName: string, currentPrice: number) => {
        const name = window.prompt("Update product name", currentName)
        if (name === null || name.trim() === "") return

        const priceInput = window.prompt("Update product price", String(currentPrice))
        if (priceInput === null || priceInput.trim() === "") return

        const price = Number(priceInput)
        if (Number.isNaN(price)) return

        try {
            await updateProduct(id, { name: name.trim(), price })
        } catch {
            // Error is handled in the product store
        }
    }

    return (
        <div className="w-full px-4 sm:px-6 mt-6">

            <div className="bg-white rounded-[24px] sm:rounded-[28px] border p-4 sm:p-6 shadow-sm">
                {isLoading && (
                    <div className="pb-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                        Loading products...
                    </div>
                )}
                {error && (
                    <div className="pb-4 text-[11px] font-semibold text-red-500 uppercase tracking-wider">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="pb-4 text-[11px] font-semibold text-green-600 uppercase tracking-wider">
                        {successMessage}
                    </div>
                )}

                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full text-xs sm:text-sm min-w-[700px]">

                        {/* HEADER */}
                        <thead className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 border-b">
                            <tr>
                                <th className="text-left py-3">Product</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Price</th>
                                <th className="text-left">Stock</th>
                                <th className="text-left">Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>

                            {products.map((p, i) => (
                                <tr
                                    key={p.id || i}
                                    className="border-t border-gray-100 hover:bg-gray-50/50 transition"
                                >

                                    {/* PRODUCT */}
                                    <td className="py-4 sm:py-5">
                                        <Link to={`/products/${p.id}`} className="flex items-center gap-3 sm:gap-4 group cursor-pointer">

                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-cover group-hover:opacity-80 transition"
                                            />

                                            <div className="min-w-0">

                                                <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate group-hover:text-red-500 transition underline-offset-2 decoration-red-500/30 group-hover:underline">
                                                    {p.name}
                                                </p>

                                                <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                                                    SKU: {p.id}
                                                </p>

                                            </div>

                                        </Link>
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                                        {p.category}
                                    </td>

                                    {/* PRICE */}
                                    <td className="font-semibold text-gray-900 text-xs sm:text-sm whitespace-nowrap">
                                        ${p.price.toFixed(2)}
                                    </td>

                                    {/* STOCK */}
                                    <td className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                                        {p.stockInfo}
                                    </td>

                                    {/* STATUS */}
                                    <td className="whitespace-nowrap">
                                        <StatusBadge status={p.stockInfo.toLowerCase().includes("out") ? "Draft" : "Active"} />
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2 sm:gap-3">

                                            <button
                                                onClick={() => handleQuickUpdate(p.id, p.name, p.price)}
                                                disabled={isLoading}
                                                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                                            >
                                                <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 hover:text-black" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                disabled={isLoading}
                                                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition disabled:opacity-50"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 hover:text-red-500" />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    )
}

/* STATUS BADGE */
function StatusBadge({ status }: { status: string }) {
    const styles = {
        Active: "bg-green-100 text-green-600",
        Draft: "bg-gray-200 text-gray-500",
    }

    return (
        <span
            className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium ${styles[status as keyof typeof styles]}`}
        >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-current" />
            {status.toUpperCase()}
        </span>
    )
}