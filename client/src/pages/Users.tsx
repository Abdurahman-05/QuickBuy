import UsersHeader from "@/components/users/UsersHeader";
import UsersStats from "@/components/users/stats/UsersStats";
import UsersTable from "@/components/users/table/UsersTable";
import Sidebar from "@/components/layout/Sidebar";

export default function Users() {
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] w-full overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0 mt-16 lg:mt-0">

                {/* CONTENT WRAPPER */}
                <div className="
                    w-full
                    px-4 sm:px-6 md:px-8
                    py-5 sm:py-6
                    space-y-5 sm:space-y-6
                    max-w-7xl mx-auto
                ">

                    <UsersHeader />

                    <UsersStats />

                    <div className="w-full min-w-0">
                        <UsersTable />
                    </div>

                </div>

            </div>
        </div>
    );
}