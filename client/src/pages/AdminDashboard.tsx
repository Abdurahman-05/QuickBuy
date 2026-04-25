import { useEffect, useState } from 'react'; // 1. Import hooks
import axios from 'axios'; // 2. Import axios
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/ui/Navbar";
import StatCard from "../components/admin-dashboard/StatCard";
import OrdersTable from "../components/admin-dashboard/DashboardOrderTable";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();
    // 3. Define state for stats
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 1240, // Keeps your existing mock data
        totalUsers: 842,
        revenue: 45200
    });

    // 4. Fetch the real product count from your backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products/dashboard/stats");
                setStats(prev => ({ ...prev, totalProducts: response.data.totalProducts }));
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 mt-10 lg:mt-0">
                <Navbar />
                <div className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
                    {/* ... Header stays the same ... */}
                    
                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full min-w-0">
                        {/* 5. Connected StatCard */}
                        <StatCard
                            title="Total Products"
                            value={stats.totalProducts} 
                            change="+12% this month"
                            trend="up"
                            type="products"
                            path="/admin/products"
                        />

                        {/* Other cards keep their existing values */}
                        <StatCard title="Total Orders" value={stats.totalOrders} change="+8.4% since Monday" trend="up" type="orders" path="/admin/orders" />
                        <StatCard title="Total Users" value={stats.totalUsers} change="Stable performance" trend="stable" type="users" path="/admin/users" />
                        <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} change="Record breaking week" trend="up" type="revenue" path="/admin/dashboard" />
                    </div>

                    <div className="w-full min-w-0"><OrdersTable /></div>
                </div>
            </div>
        </div>
    )
}