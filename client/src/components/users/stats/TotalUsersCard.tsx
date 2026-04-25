import { Card } from "../../ui/card";
import statsImage from "@/assets/statsimg.svg";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

export default function TotalUsersCard() {
    const [count, setCount] = useState(0);
    const users = useAuthStore((state) => state.users);
    const total = users.length;

    useEffect(() => {
        let start = 0;
        const end = total;
        const duration = 1200;
        const step = end / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(Math.floor(start));
        }, 16);

        return () => clearInterval(timer);
    }, [total]);

    return (
        <Card className="relative overflow-hidden rounded-2xl border bg-gray-50 shadow-sm w-full">

            {/* WRAPPER */}
            <div className="flex flex-col sm:flex-row h-auto sm:h-[165px]">

                {/* LEFT SIDE */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center px-6 sm:px-8 py-5 z-10">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                        Total Active Users
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                        {count.toLocaleString()}
                    </h2>

                    <div className="flex items-center gap-2 mt-3 text-red-500 text-sm font-medium">
                        <span className="text-base">↗</span>
                        <span>{total > 0 ? "Live from backend" : "No users yet"}</span>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full sm:w-1/2 relative overflow-hidden min-h-[140px] sm:min-h-0">

                    <img
                        src={statsImage}
                        alt="stats"
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />

                    <div className="absolute inset-0 bg-gradient-to-l from-gray-50 via-gray-50/40 to-transparent" />
                </div>

            </div>
        </Card>
    );
}