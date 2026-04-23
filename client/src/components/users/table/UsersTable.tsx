import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
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

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

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
                        className="h-9 px-3 sm:px-4 rounded-full border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center gap-2"
                    >
                        <ListFilter size={14} />
                        Filter
                    </Button>

                    <Button
                        className="h-9 px-3 sm:px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium flex items-center gap-2 shadow-none"
                    >
                        <Download size={14} />
                        Export
                    </Button>

                </div>
            </div>

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
                                ) : users.length > 0 ? (
                                    users.map((user) => (
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
                    Showing {users.length} of {users.length} users
                </span>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 w-full sm:w-auto">

                    <span className="text-gray-400 cursor-pointer">
                        Previous
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-black" />
                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>

                    <span className="text-gray-700 font-medium cursor-pointer hover:text-black">
                        Next Page
                    </span>

                </div>
            </div>

        </div>
    );
}