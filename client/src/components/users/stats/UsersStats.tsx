import TotalUsersCard from "./TotalUsersCard";
import NewRegistrationsCard from "./NewRegistrationsCard";

export default function UsersStats() {
    return (
        <div className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4 sm:gap-5 lg:gap-6
            w-full min-w-0
        ">

            {/* LEFT BIG CARD */}
            <div className="lg:col-span-2">
                <TotalUsersCard />
            </div>

            {/* RIGHT CARD */}
            <div className="lg:col-span-1">
                <NewRegistrationsCard />
            </div>

        </div>
    );
}