import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";

import UserRow from "./UserRow";
import { ListFilter, Download } from "lucide-react";
import { Button } from "../../ui/button";

const users = [
    {
        name: "Alexander Wright",
        email: "alex.wright@design.com",
        role: "ADMIN",
        date: "Oct 12, 2023",
        id: "QB-8291",
    },
    {
        name: "Elena Rodriguez",
        email: "elena.r@techmail.io",
        role: "USER",
        date: "Jan 05, 2024",
        id: "QB-7742",
    },
    {
        name: "Marcus Sterling",
        email: "m.sterling@global.net",
        role: "USER",
        date: "Nov 28, 2023",
        id: "QB-9011",
    },
    {
        name: "Sarah Chen",
        email: "sarah.chen@innovate.co",
        role: "USER",
        date: "Mar 15, 2024",
        id: "QB-1120",
    },
];

export default function UsersTable() {
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

            {/* TABLE CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">

                {/* SCROLL CONTAINER (KEY FIX) */}
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
                                {users.map((user, i) => (
                                    <UserRow key={i} user={user} />
                                ))}
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
                    Showing 4 of 12,480 users
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