import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "../../ui/table";

import UserRow from "./UserRow";
import { ListFilter, Download, Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useAuthStore } from "../../../store/useAuthStore";

export default function UsersTable() {
    const users = useAuthStore((state) => state.users);
    const getAllUsers = useAuthStore((state) => state.getAllUsers);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [roleFilter, setRoleFilter] = React.useState<"ALL" | "ADMIN" | "USER">("ALL");
    const [joinedFilter, setJoinedFilter] = React.useState<"ALL_TIME" | "LAST_30_DAYS" | "THIS_YEAR">("ALL_TIME");
    const pageSize = 10;

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);
    useEffect(() => {
        setCurrentPage(1);
    }, [users.length]);

    const filteredUsers = React.useMemo(() => {
        return users.filter((user) => {
            const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
            if (!matchesRole) return false;
            if (joinedFilter === "ALL_TIME") return true;

            const createdAt = user.createdAt ? new Date(user.createdAt) : null;
            if (!createdAt || Number.isNaN(createdAt.getTime())) return false;
            const now = new Date();

            if (joinedFilter === "LAST_30_DAYS") {
                const threshold = new Date(now);
                threshold.setDate(now.getDate() - 30);
                return createdAt >= threshold;
            }

            return createdAt.getFullYear() === now.getFullYear();
        });
    }, [users, roleFilter, joinedFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedUsers = filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize);
    const pageNumbers = React.useMemo(
        () =>
            Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                return Math.abs(page - safePage) <= 1;
            }),
        [totalPages, safePage]
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className="space-y-4 sm:space-y-5 w-full min-w-0">

            {/* HEADER */}
            <div className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-3 sm:gap-4
            ">

                <h2 className="text-lg sm:text-[22px] font-semibold tracking-tight text-gray-900">
                    Customer Directory
                </h2>

                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

                    <Button
                        variant="outline"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        className="h-9 px-3 sm:px-4 rounded-full border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center gap-2"
                    >
                        <ListFilter size={14} />
                        Filter
                    </Button>

                    <Button
                        onClick={() => {
                            const header = ["ID", "Name", "Email", "Role", "Joined Date"];
                            const rows = filteredUsers.map((user) => [
                                user._id || "",
                                `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                                user.email || "",
                                user.role || "",
                                user.createdAt ? new Date(user.createdAt).toISOString() : "",
                            ]);
                            const csv = [header, ...rows]
                                .map((row) =>
                                    row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
                                )
                                .join("\n");
                            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", "users-export.csv");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                        }}
                        className="h-9 px-3 sm:px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center gap-2 shadow-none"
                    >
                        <Download size={14} />
                        Export
                    </Button>

                </div>
            </div>
            {isFilterOpen && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Role</span>
                        {(["ALL", "USER", "ADMIN"] as const).map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => {
                                    setRoleFilter(role);
                                    setCurrentPage(1);
                                }}
                                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                                    roleFilter === role
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Joined</span>
                        {([
                            { value: "ALL_TIME", label: "All Time" },
                            { value: "LAST_30_DAYS", label: "Last 30 Days" },
                            { value: "THIS_YEAR", label: "This Year" },
                        ] as const).map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => {
                                    setJoinedFilter(item.value);
                                    setCurrentPage(1);
                                }}
                                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                                    joinedFilter === item.value
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setRoleFilter("ALL");
                            setJoinedFilter("ALL_TIME");
                            setCurrentPage(1);
                        }}
                        className="ml-auto px-3 py-1.5 rounded-full text-[11px] font-bold border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                        Reset
                    </button>
                </div>
            )}

            {/* ERROR STATE */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
                    {error}
                </div>
            )}

            {/* TABLE CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">

                {/* SCROLL CONTAINER */}
                <div className="w-full overflow-x-auto">

                    <div className="min-w-[700px]">

                        <Table className="w-full">

                            {/* HEADER */}
                            <TableHeader>
                                <TableRow className="bg-gray-50/60 border-b border-gray-300/40">

                                    <TableHead className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-[0.18em] py-4 sm:py-5 px-4 sm:px-6">
                                        Name
                                    </TableHead>

                                    <TableHead className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-[0.18em] px-4 sm:px-6">
                                        Email Address
                                    </TableHead>

                                    <TableHead className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-[0.18em] px-4 sm:px-6">
                                        Role
                                    </TableHead>

                                    <TableHead className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-[0.18em] px-4 sm:px-6">
                                        Joined Date
                                    </TableHead>

                                    <TableHead className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-[0.18em] px-4 sm:px-6 text-right">
                                        Actions
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            {/* BODY */}
                            <TableBody className="divide-y divide-gray-100/70">
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-40 text-center">
                                            <div className="flex items-center justify-center gap-3 text-gray-400">
                                                <Loader2 size={18} className="animate-spin" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Loading Customers...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : paginatedUsers.length > 0 ? (
                                    paginatedUsers.map((user) => (
                                        <UserRow key={user._id} user={user} />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-40 text-center text-gray-400 uppercase text-[10px] font-black tracking-widest">
                                            No customers found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>

                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="
                flex flex-col sm:flex-row
                sm:items-center sm:justify-between
                gap-3 sm:gap-4
                text-xs sm:text-sm text-gray-400
            ">

                <span>
                    Showing {(safePage - 1) * pageSize + (filteredUsers.length ? 1 : 0)}–{Math.min(safePage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
                </span>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 w-full sm:w-auto">

                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                        className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Prev
                    </button>

                    <div className="flex items-center gap-2">
                        {pageNumbers.map((page, index) => {
                            const previous = pageNumbers[index - 1];
                            const showLeftEllipsis = previous && page - previous > 1;
                            return (
                                <div key={page} className="flex items-center gap-2">
                                    {showLeftEllipsis && (
                                        <span className="text-xs text-gray-400 px-1">...</span>
                                    )}
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        className={`h-8 min-w-8 px-2 rounded-lg text-xs font-bold border transition-colors ${
                                            safePage === page
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                        className="h-8 px-3 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>

                </div>
            </div>

        </div>
    );
}