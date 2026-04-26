import Sidebar from "../components/layout/Sidebar"
import Navbar from "../components/layout/Navbar"
import StatCard from "../components/admin-dashboard/StatCard"
import OrdersTable from "../components/admin-dashboard/DashboardOrderTable"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useProductStore } from "../store/useProductStore"
import { useAuthStore } from "../store/useAuthStore"
import { useOrderStore } from "../store/useOrderStore"

import { Plus } from "lucide-react"

export default function Dashboard() {
    const navigate = useNavigate()
    const products = useProductStore((state) => state.products)
    const getAllProducts = useProductStore((state) => state.getAllProducts)
    const users = useAuthStore((state) => state.users)
    const getAllUsers = useAuthStore((state) => state.getAllUsers)
    const allOrders = useOrderStore((state) => state.allOrders)
    const getAllOrders = useOrderStore((state) => state.getAllOrders)

    useEffect(() => {
        getAllProducts()
        getAllUsers()
        getAllOrders()
    }, [getAllProducts, getAllUsers, getAllOrders])

    const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0)
    const pendingOrders = allOrders.filter((order) => order.orderStatus === "PENDING").length
    return (
        <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0 mt-10 lg:mt-0">

                {/* NAVBAR */}
                <Navbar />

                {/* CONTENT */}
                <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">

                    {/* HEADER */}
                    <div className="
                        flex flex-col sm:flex-row
                        sm:items-center sm:justify-between
                        gap-4 sm:gap-6
                    ">

                        {/* TEXT */}
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">
                                Dashboard
                            </h1>

                            <p className="text-gray-400 text-sm sm:text-base mt-1">
                                Weekly business overview and performance summary.
                            </p>
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={() => navigate("/addproduct")}
                            className="
                flex items-center justify-center gap-2
                bg-black text-white
                px-4 sm:px-5 py-2.5
                rounded-full shadow-sm
                hover:shadow-md transition
                w-full sm:w-auto
            "
                        >
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
                                <Plus className="w-4 h-4" />
                            </span>

                            <span className="text-sm sm:text-base">
                                Add Product
                            </span>
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="
                        grid grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4
                        gap-4 lg:gap-6
                        w-full min-w-0
                    ">
                        <StatCard
                            title="Total Products"
                            value={products.length}
                            change="Live inventory"
                            trend="stable"
                            type="products"
                            path="/admin/products"
                        />

                        <StatCard
                            title="Total Orders"
                            value={allOrders.length}
                            change={`${pendingOrders} pending`}
                            trend={pendingOrders > 0 ? "up" : "stable"}
                            type="orders"
                            path="/admin/orders"
                        />

                        <StatCard
                            title="Total Users"
                            value={users.length}
                            change="Live from backend"
                            trend="stable"
                            type="users"
                            path="/admin/users"
                        />

                        <StatCard
                            title="Revenue"
                            value={Number(totalRevenue.toFixed(0))}
                            change="Live from placed orders"
                            trend="stable"
                            type="revenue"
                            path="/admin/dashboard"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="w-full min-w-0">
                        <OrdersTable />
                    </div>

                </div>
            </div>
        </div>
    )
}