import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { useProductStore } from "../../store/useProductStore"
import type { Product } from "../../types/product"

interface ProductsTableProps {
    products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
    const isLoading = useProductStore((state) => state.isLoading)
    const error = useProductStore((state) => state.error)
    const successMessage = useProductStore((state) => state.successMessage)
    const clearSuccessMessage = useProductStore((state) => state.clearSuccessMessage)
    const updateProduct = useProductStore((state) => state.updateProduct)
    const deleteProduct = useProductStore((state) => state.deleteProduct)
    const [editingProduct, setEditingProduct] = useState<{ id: string; name: string; price: string } | null>(null)

    useEffect(() => {
        if (!successMessage) return
        const timer = setTimeout(() => clearSuccessMessage(), 2800)
        return () => clearTimeout(timer)
    }, [successMessage, clearSuccessMessage])

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id)
        } catch {
            // Error is handled in the product store
        }
    }

    const handleQuickUpdate = async () => {
        if (!editingProduct) return
        const price = Number(editingProduct.price)
        if (!editingProduct.name.trim() || Number.isNaN(price)) return
        try {
            await updateProduct(editingProduct.id, { name: editingProduct.name.trim(), price })
            setEditingProduct(null)
        } catch {
            // Error is handled in the product store
        }
    }

    const hasProducts = useMemo(() => products.length > 0, [products.length])

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
                    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-20 pointer-events-none">
                        <div className="bg-white border border-emerald-200 shadow-xl rounded-2xl px-5 py-4">
                            <p className="text-[11px] font-black text-emerald-600 uppercase tracking-wider">Success</p>
                            <p className="text-sm text-emerald-700 mt-1">{successMessage}</p>
                        </div>
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
                                                onClick={() => setEditingProduct({ id: p.id, name: p.name, price: String(p.price) })}
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
                            {!isLoading && !hasProducts && (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-gray-400 font-semibold text-sm">
                                        No products match your current filter.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

            </div>
            {editingProduct && (
                <div className="fixed inset-0 z-[95] bg-black/35 backdrop-blur-[1px] flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Update Product</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-5">Quick Edit</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500">Product name</label>
                                <input
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Price</label>
                                <input
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3 justify-end">
                            <button onClick={() => setEditingProduct(null)} className="px-4 py-2.5 rounded-full border border-gray-200 text-sm hover:bg-gray-50">Cancel</button>
                            <button onClick={handleQuickUpdate} className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800">Save</button>
                        </div>
                    </div>
                </div>
            )}
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