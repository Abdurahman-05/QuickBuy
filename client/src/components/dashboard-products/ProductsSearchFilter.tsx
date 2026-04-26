import { Search, ListFilter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProductsSearchFilterProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export default function ProductsSearchFilter({ value, onChange, onClear }: ProductsSearchFilterProps) {
    return (
        <div className="w-full px-6 mt-6">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

                {/* SEARCH */}
                <form 
                    className="relative flex-1 w-full bg-gray-200 rounded-full"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <Input
                        name="q"
                        placeholder="Search product name, SKU, or category..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="
                            w-full h-12
                            pl-10 pr-4
                            rounded-full
                            text-gray-500
                            bg-[#EEEEEE] border-none
                            text-sm
                            focus-visible:ring-0 focus-visible:ring-offset-0
                        "
                    />
                </form>

                {/* FILTER BUTTON */}
                <Button
                    variant="outline"
                    onClick={onClear}
                    className="h-9 px-5 sm:px-4 py-2 rounded-full border-gray-200 bg-[#EEEEEE] hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center gap-2"
                >
                    <ListFilter size={14} />
                    Clear
                </Button>

            </div>
        </div>
    )
}