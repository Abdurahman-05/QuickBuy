import { Card } from "../../ui/card"
import { Avatar, AvatarImage } from "../../ui/avatar";
import { useAuthStore } from "../../../store/useAuthStore";

export default function NewRegistrationsCard() {
    const users = useAuthStore((state) => state.users);
    const last30Days = users.filter((u) => {
        if (!u.createdAt) return false;
        const created = new Date(u.createdAt).getTime();
        return Date.now() - created <= 30 * 24 * 60 * 60 * 1000;
    });

    return (
        <Card className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-black to-gray-900 text-white border-none shadow-none w-full min-w-0">

            <div className="
                p-4 sm:p-5 lg:p-6
                min-h-[130px] sm:min-h-[150px] lg:min-h-[160px]
                flex flex-col justify-between
            ">

                {/* TITLE */}
                <p className="text-[10px] sm:text-xs uppercase text-gray-400 tracking-wider font-medium">
                    New Registrations
                </p>

                {/* VALUE */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                    {last30Days.length}
                </h2>

                {/* AVATAR ROW */}
                <div className="flex items-center gap-2 sm:gap-3">

                    {/* AVATARS */}
                    <div className="flex -space-x-2 sm:-space-x-3">
                        {last30Days.slice(0, 3).map((u, i) => (
                            <Avatar
                                key={u._id}
                                className="
                                    w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9
                                    border-2 border-black shadow-sm
                                "
                            >
                                <AvatarImage src={u.profileImage || `https://i.pravatar.cc/40?img=${i + 1}`} />
                            </Avatar>
                        ))}
                    </div>

                    {/* BADGE */}
                    <div className="
                        text-[10px] sm:text-xs
                        bg-white/20 px-2 py-1
                        rounded-full backdrop-blur-sm
                        whitespace-nowrap
                    ">
                        +{last30Days.length}
                    </div>

                </div>
            </div>
        </Card>
    );
}