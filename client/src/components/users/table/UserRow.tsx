import { TableCell, TableRow } from "../../ui/table";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function UserRow({ user }: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    // Format date beautifully
    const joinedDate = user.createdAt 
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        })
        : "N/A";

    return (
        <TableRow className="hover:bg-gray-50/60 transition border-none">

            {/* NAME */}
            <TableCell className="py-4 sm:py-5 px-3 sm:px-4 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">

                    <Avatar className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 overflow-hidden rounded-full border border-gray-200">
                        {user.profileImage && user.profileImage.trim().length > 0 ? (
                            <AvatarImage src={user.profileImage} className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-[10px]">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                        )}
                    </Avatar>

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.firstName} {user.lastName}
                        </p>

                        <p className="text-[11px] sm:text-xs text-gray-400 truncate uppercase tracking-widest font-medium">
                            ID: {user._id?.slice(-6)}
                        </p>
                    </div>

                </div>
            </TableCell>

            {/* EMAIL */}
            <TableCell className="text-xs sm:text-sm text-gray-500 px-3 sm:px-4 max-w-[180px] sm:max-w-none truncate font-medium">
                {user.email}
            </TableCell>

            {/* ROLE */}
            <TableCell className="px-3 sm:px-4">
                <Badge
                    className={
                        user.role === "ADMIN"
                            ? "bg-black text-white text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-black uppercase tracking-wider"
                            : "bg-gray-100 text-gray-400 text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-black uppercase tracking-wider"
                    }
                >
                    {user.role}
                </Badge>
            </TableCell>

            {/* DATE */}
            <TableCell className="text-xs sm:text-sm text-gray-500 px-3 sm:px-4 whitespace-nowrap font-medium">
                {joinedDate}
            </TableCell>

            {/* ACTIONS */}
            <TableCell className="text-right pr-3 sm:pr-6 relative">
                <div className="flex justify-end">
                    <button onClick={() => setMenuOpen((o) => !o)} className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 transition">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
                {menuOpen && (
                    <div className="absolute right-2 top-10 z-20 w-40 bg-white border border-gray-200 rounded-xl shadow-lg text-left">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(user.email);
                                setMenuOpen(false);
                            }}
                            className="w-full px-3 py-2 text-xs hover:bg-gray-50"
                        >
                            Copy email
                        </button>
                        <a
                            href={`mailto:${user.email}`}
                            className="block w-full px-3 py-2 text-xs hover:bg-gray-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Send email
                        </a>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                        >
                            Close
                        </button>
                    </div>
                )}
            </TableCell>

        </TableRow>
    );
}