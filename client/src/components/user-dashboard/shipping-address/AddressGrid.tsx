import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";
import api from "../../../lib/axios";
import { useAuthStore } from "../../../store/useAuthStore";

type AddressEntry = {
    id: string;
    title: string;
    recipient: string;
    address: string;
    phone: string;
    isPrimary: boolean;
};

type RawAddress = {
    _id?: string;
    id?: string;
    label?: string;
    title?: string;
    recipient?: string;
    fullName?: string;
    name?: string;
    address?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    phone?: string;
    isPrimary?: boolean;
    primary?: boolean;
};

const toReadableAddress = (raw: RawAddress): string => {
    const inlineAddress = (raw.address || "").trim();
    if (inlineAddress) return inlineAddress;

    return [raw.street, raw.city, raw.state, raw.zipCode, raw.country]
        .map((part) => (part || "").trim())
        .filter(Boolean)
        .join(", ");
};

const toAddressEntry = (raw: RawAddress, idx: number): AddressEntry | null => {
    const id = String(raw._id || raw.id || `addr-${idx + 1}`);
    const address = toReadableAddress(raw);
    if (!address) return null;

    return {
        id,
        title: (raw.title || raw.label || "Shipping Address").trim(),
        recipient: (raw.recipient || raw.fullName || raw.name || "Account User").trim(),
        address,
        phone: (raw.phone || "Not provided").trim(),
        isPrimary: Boolean(raw.isPrimary ?? raw.primary),
    };
};

const extractAddresses = (payload: any): AddressEntry[] => {
    const candidates = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.addresses)
            ? payload.addresses
            : Array.isArray(payload?.data)
                ? payload.data
                : [];

    return candidates
        .map((item: RawAddress, idx: number) => toAddressEntry(item, idx))
        .filter(Boolean) as AddressEntry[];
};

const AddressGrid = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [addresses, setAddresses] = useState<AddressEntry[]>([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
    const [editingAddress, setEditingAddress] = useState<AddressEntry | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const getMe = useAuthStore((state) => state.getMe);
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

    const openEditModal = (id: string) => {
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

    const saveAddress = async () => {
        if (!formData.title.trim() || !formData.recipient.trim() || !formData.address.trim() || !formData.phone.trim()) {
            return;
        }

        try {
            const payload = {
                title: formData.title.trim(),
                recipient: formData.recipient.trim(),
                address: formData.address.trim(),
                phone: formData.phone.trim(),
                isPrimary: formData.isPrimary,
            };

            if (editingAddress) {
                await api.patch(`users/addresses/${editingAddress.id}`, payload);
            } else {
                await api.post("users/addresses", payload);
            }

            const response = await api.get("users/addresses");
            const backendAddresses = extractAddresses(response.data);
            if (backendAddresses.length > 0) {
                setAddresses(backendAddresses);
            }
            await getMe();
            closeModal();
            return;
        } catch {
            // Fall back to local state if address endpoints are unavailable.
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
            const nextId = `local-${Date.now()}`;
            const nextEntry: AddressEntry = { id: nextId, ...formData };
            setAddresses((prev) =>
                formData.isPrimary
                    ? [...prev.map((item) => ({ ...item, isPrimary: false })), nextEntry]
                    : [...prev, nextEntry]
            );
        }
        closeModal();
    };

    const removeAddress = async (id: string) => {
        try {
            await api.delete(`users/addresses/${id}`);
            const response = await api.get("users/addresses");
            const backendAddresses = extractAddresses(response.data);
            setAddresses(backendAddresses);
            await getMe();
            return;
        } catch {
            // Fall back to local state when backend endpoint is unavailable.
        }

        setAddresses((prev) => prev.filter((item) => item.id !== id));
    };

    const primaryAddressId = useMemo(() => addresses.find((a) => a.isPrimary)?.id, [addresses]);

    useEffect(() => {
        let mounted = true;

        const hydrateAddresses = async () => {
            if (!isAuthenticated) {
                if (mounted) setAddresses([]);
                return;
            }

            setIsLoadingAddresses(true);
            try {
                const response = await api.get("users/addresses");
                const backendAddresses = extractAddresses(response.data);
                if (mounted && backendAddresses.length > 0) {
                    setAddresses(backendAddresses);
                    setIsLoadingAddresses(false);
                    return;
                }
            } catch {
                // Fall through to auth profile fallback.
            }

            const fallbackAddress = user?.address
                ? toAddressEntry(
                    {
                        id: user._id ? `${user._id}-profile` : "profile-address",
                        title: "Primary Address",
                        recipient: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Account User",
                        phone: user.phone || "Not provided",
                        ...user.address,
                        isPrimary: true,
                    },
                    0
                )
                : null;

            if (mounted) {
                setAddresses(fallbackAddress ? [fallbackAddress] : []);
                setIsLoadingAddresses(false);
            }
        };

        void hydrateAddresses();
        return () => {
            mounted = false;
        };
    }, [isAuthenticated, user]);

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
                    onRemove={removeAddress}
                />
            ))}
            {!isLoadingAddresses && addresses.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-10 text-center text-sm text-gray-500">
                    No saved addresses yet. Add your first shipping address.
                </div>
            )}

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