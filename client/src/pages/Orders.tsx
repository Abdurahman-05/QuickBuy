import OrdersNavbar from "../components/orders/OrdersNavbar"
import OrdersTopSection from "../components/orders/OrdersTopSection"
import OrdersTable from "../components/orders/OrdersTable"
import Sidebar from "../components/layout/Sidebar"

export default function OrdersPage() {
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] w-full overflow-x-hidden">
            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* NAVBAR */}
                <OrdersNavbar />

                {/* CONTENT */}
                <div className="pb-20">
                    <OrdersTopSection />
                    <OrdersTable />
                </div>
            </div>
        </div>
    )
}