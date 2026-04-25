import { UploadCloud } from "lucide-react"
import { useState, type FormEvent, type MouseEvent } from "react"
import { useProductStore } from "../../../store/useProductStore"

export default function ProductForm() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("Select Category")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState("")
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const options = ["Electronics", "Clothing", "Accessories"]
    const createProduct = useProductStore((state) => state.createProduct)
    const isLoading = useProductStore((state) => state.isLoading)
    const error = useProductStore((state) => state.error)
    const successMessage = useProductStore((state) => state.successMessage)
    const clearError = useProductStore((state) => state.clearError)
    const clearSuccessMessage = useProductStore((state) => state.clearSuccessMessage)

    const handleSubmit = async (e?: FormEvent | MouseEvent) => {
        e?.preventDefault()
        clearError()
        clearSuccessMessage()

        const parsedPrice = Number(price)
        if (!name.trim() || !description.trim() || Number.isNaN(parsedPrice) || selected === "Select Category") {
            return
        }

        try {
            await createProduct({
                name: name.trim(),
                description: description.trim(),
                price: parsedPrice,
                category: selected,
                image: selectedImage,
            })
            setName("")
            setPrice("")
            setDescription("")
            setStock("")
            setSelected("Select Category")
            setSelectedImage(null)
        } catch {
            // Errors are already handled in store.
        }
    }

    return (
        <div className="bg-[#f9fafb] min-h-screen py-6 sm:py-8 lg:py-10 overflow-x-hidden">

            {/* CONTAINER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* TITLE */}
                <div className="mb-8 sm:mb-10 lg:mb-12">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Add New Product
                    </h1>

                    <div className="w-10 sm:w-12 h-[3px] bg-red-500 mt-2 sm:mt-3 rounded-full" />
                </div>

                {error && (
                    <div className="mb-5 text-[11px] font-semibold text-red-500 uppercase tracking-wider">{error}</div>
                )}
                {successMessage && (
                    <div className="mb-5 text-[11px] font-semibold text-green-600 uppercase tracking-wider">{successMessage}</div>
                )}

                {/* FORM GRID */}
                <form
                    onSubmit={handleSubmit}
                    className="
                    grid grid-cols-1
                    lg:grid-cols-3
                    gap-6 sm:gap-8 lg:gap-10
                "
                >

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8 lg:space-y-10 min-w-0">

                        {/* PRODUCT NAME */}
                        <div>
                            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                Product Name
                            </label>

                            <input
                                type="text"
                                placeholder="e.g., Reference Headphones Mk.II"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 sm:mt-3 w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>

                        {/* PRICE + STOCK */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <div>
                                <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                    Price (USD)
                                </label>

                                <input
                                    type="text"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-2 sm:mt-3 w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                    Stock Quantity
                                </label>

                                <input
                                    type="text"
                                    placeholder="Units"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="mt-2 sm:mt-3 w-full bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                Description
                            </label>

                            <textarea
                                placeholder="Describe the technical excellence and editorial soul of this product..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-2 sm:mt-3 w-full h-32 sm:h-40 lg:h-44 bg-white border border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none resize-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-10">

                        {/* CATEGORY */}
                        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border">
                            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                Category
                            </label>

                            <div className="relative mt-3 sm:mt-4">

                                <button
                                    onClick={() => setOpen(!open)}
                                    type="button"
                                    className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700"
                                >
                                    {selected}

                                    <svg
                                        className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    className={`absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-200
                                    ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                                    `}
                                >
                                    {options.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSelected(item)
                                                setOpen(false)
                                            }}
                                            className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* UPLOAD */}
                        <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 border">
                            <label className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
                                Product Visuals
                            </label>

                            <label className="mt-4 sm:mt-5 border-2 border-dashed border-gray-200 rounded-xl sm:rounded-2xl h-44 sm:h-56 lg:h-64 flex flex-col items-center justify-center text-center hover:bg-gray-100 transition cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                                />

                                <div className="bg-white p-3 sm:p-4 rounded-full shadow-sm mb-3 sm:mb-4">
                                    <UploadCloud className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    Drag & Drop Product Shot
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {selectedImage ? selectedImage.name : "JPG or PNG • 2000px+"}
                                </p>
                            </label>
                        </div>
                    </div>
                </form>

                {/* ACTION BUTTONS */}
                <div className="mt-10 flex flex-col lg:items-end items-center gap-4">

                    {/* Save Button wrapper */}
                    <div className="flex flex-col items-center lg:items-end">

                        {/* Save Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="
            bg-black text-white
            px-10 sm:px-12
            py-3 sm:py-3.5
            rounded-full
            text-sm tracking-wide font-medium
            hover:bg-gray-900 active:scale-[0.98]
            transition-all duration-200
            shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
        "
                        >
                            {isLoading ? "SAVING..." : "SAVE PRODUCT"}
                            <span className="ml-2">→</span>
                        </button>

                        {/* Cancel Button centered under Save */}
                        <button className="
            mt-3
            text-gray-400
            text-xs sm:text-sm
            tracking-wide
            uppercase
            hover:text-gray-700
            transition
            text-center
        ">
                            Cancel Changes
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}