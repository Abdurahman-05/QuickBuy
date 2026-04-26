import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";

type AddressEntry = {
    id: number;
    title: string;
    recipient: string;
    address: string;
    phone: string;
    isPrimary: boolean;
};

const AddressGrid = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [addresses, setAddresses] = useState<AddressEntry[]>([
        {
            id: 1,
            title: "Home Office",
            recipient: "Alex Mercer",
            address:
                "742 Highview Estates, Suite 900 Cupertino, CA 95014 United States",
            phone: "+1 (555) 012-3456",
            isPrimary: true,
        },
        {
            id: 2,
            title: "Studio Space",
            recipient: "Alex Mercer",
            address:
                "1200 Industrial Way, Bldg 4 Seattle, WA 98101 United States",
            phone: "+1 (555) 987-6543",
            isPrimary: false,
        },
        {
            id: 3,
            title: "London Office",
            recipient: "A. Mercer / Logistics",
            address: "30 St Mary Axe London EC3A 8BF United Kingdom",
            phone: "+44 20 7946 0123",
            isPrimary: false,
        },
    ]);
    const [editingAddress, setEditingAddress] = useState<AddressEntry | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        recipient: "",
        address: "",
        phone: "",
        isPrimary: false,
    });

    const openAddModal = () => {
        setIsAdding(true);
        setEditingAddress(null);
        setFormData({ title: "", recipient: "", address: "", phone: "", isPrimary: false });
    };

    const openEditModal = (id: number) => {
        const target = addresses.find((a) => a.id === id);
        if (!target) return;
        setEditingAddress(target);
        setIsAdding(false);
        setFormData({
            title: target.title,
            recipient: target.recipient,
            address: target.address,
            phone: target.phone,
            isPrimary: target.isPrimary,
        });
    };

    const closeModal = () => {
        setEditingAddress(null);
        setIsAdding(false);
    };

    const saveAddress = () => {
        if (!formData.title.trim() || !formData.recipient.trim() || !formData.address.trim() || !formData.phone.trim()) {
            return;
        }
        if (editingAddress) {
            setAddresses((prev) =>
                prev.map((item) => {
                    if (item.id !== editingAddress.id) {
                        return formData.isPrimary ? { ...item, isPrimary: false } : item;
                    }
                    return { ...item, ...formData };
                })
            );
        } else {
            const nextId = Math.max(0, ...addresses.map((a) => a.id)) + 1;
            const nextEntry: AddressEntry = { id: nextId, ...formData };
            setAddresses((prev) =>
                formData.isPrimary
                    ? [...prev.map((item) => ({ ...item, isPrimary: false })), nextEntry]
                    : [...prev, nextEntry]
            );
        }
        closeModal();
    };

    const primaryAddressId = useMemo(() => addresses.find((a) => a.isPrimary)?.id, [addresses]);

    useEffect(() => {
        if (searchParams.get("new") !== "1") return;
        if (isAdding || editingAddress) return;
        openAddModal();
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.delete("new");
            return next;
        });
    }, [searchParams, isAdding, editingAddress, setSearchParams]);

    return (
        <>
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">

            {/* ADD CARD */}
            <AddAddressCard onAddClick={openAddModal} />

            {/* ADDRESS CARDS */}
            {addresses.map((addr) => (
                <AddressCard
                    key={addr.id}
                    {...addr}
                    isPrimary={addr.id === primaryAddressId}
                    onDeliverHere={() => navigate("/checkout")}
                    onEdit={openEditModal}
                />
            ))}

        </div>
        {(isAdding || editingAddress) && (
            <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                <div className="w-full max-w-xl rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                        {editingAddress ? "Edit Address" : "New Address"}
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-6">
                        {editingAddress ? "Update shipping location" : "Add shipping location"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Address title"
                            className="h-12 rounded-xl bg-gray-100 border border-transparent px-4 text-sm outline-none focus:border-gray-300"
                        />
                        <input
                            value={formData.recipient}
                            onChange={(e) => setFormData((prev) => ({ ...prev, recipient: e.target.value }))}
                            placeholder="Recipient full name"
                            className="h-12 rounded-xl bg-gray-100 border border-transparent px-4 text-sm outline-none focus:border-gray-300"
                        />
                        <input
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Phone number"
                            className="h-12 rounded-xl bg-gray-100 border border-transparent px-4 text-sm outline-none focus:border-gray-300"
                        />
                        <label className="h-12 rounded-xl bg-gray-100 border border-transparent px-4 text-sm flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.isPrimary}
                                onChange={(e) => setFormData((prev) => ({ ...prev, isPrimary: e.target.checked }))}
                            />
                            Set as primary
                        </label>
                    </div>
                    <textarea
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="Full shipping address"
                        className="mt-4 w-full min-h-[110px] rounded-xl bg-gray-100 border border-transparent px-4 py-3 text-sm outline-none focus:border-gray-300 resize-none"
                    />
                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={saveAddress}
                            className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800"
                        >
                            Save Address
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default AddressGrid;