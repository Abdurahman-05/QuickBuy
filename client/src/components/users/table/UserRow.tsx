import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

export default function UserRow({ user }: any) {
    return (
        <TableRow className="hover:bg-gray-50/60 transition border-none">

            {/* NAME */}
            <TableCell className="py-4 sm:py-5 px-3 sm:px-4 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">

                    <Avatar className="w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${user.email}`} />
                    </Avatar>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.name}
                        </p>

                        <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                            ID: {user.id}
                        </p>
                    </div>

                </div>
            </TableCell>

            {/* EMAIL */}
            <TableCell className="text-xs sm:text-sm text-gray-500 px-3 sm:px-4 max-w-[180px] sm:max-w-none truncate">
                {user.email}
            </TableCell>

            {/* ROLE */}
            <TableCell className="px-3 sm:px-4">
                <Badge
                    className={
                        user.role === "ADMIN"
                            ? "bg-black text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-full whitespace-nowrap"
                            : "bg-gray-100 text-gray-500 text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-full whitespace-nowrap"
                    }
                >
                    {user.role}
                </Badge>
            </TableCell>

            {/* DATE */}
            <TableCell className="text-xs sm:text-sm text-gray-500 px-3 sm:px-4 whitespace-nowrap">
                {user.date}
            </TableCell>

            {/* ACTIONS */}
            <TableCell className="text-right pr-3 sm:pr-6">
                <div className="flex justify-end">
                    <button className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 transition">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </TableCell>

        </TableRow>
    );
}