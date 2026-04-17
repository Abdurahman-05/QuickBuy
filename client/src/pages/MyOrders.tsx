import React from 'react';
import { 
  Bell, Search, User, ShoppingBag, Heart, 
  MapPin, Settings, LogOut, Truck, ChevronDown 
} from 'lucide-react';

interface OrderItem {
  id: string;
  title: string;
  status: 'PROCESSING' | 'DELIVERED' | 'SHIPPED';
  date: string;
  price: string;
  image: string;
}

const orders: OrderItem[] = [
  {
    id: 'QB-90214',
    title: "iPad Pro 12.9'' M2 Space Gray",
    status: 'PROCESSING',
    date: 'Oct 24, 2023',
    price: '1,099.00',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop',
  },
  {
    id: 'QB-89441',
    title: "Studio One Headphones - Matte Black",
    status: 'DELIVERED',
    date: 'Sep 12, 2023',
    price: '349.00',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  },
  {
    id: 'QB-88120',
    title: "Vanguard Smart Series X - Steel",
    status: 'SHIPPED',
    date: 'Aug 30, 2023',
    price: '599.00',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  },
];

const MyOrders: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-red-500">QuickBuy</h1>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <User size={24} className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Premium Member</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Account Active</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<User size={18} />} label="Profile Overview" />
          <NavItem icon={<ShoppingBag size={18} />} label="My Orders" active />
          <NavItem icon={<Heart size={18} />} label="Wishlist" />
          <NavItem icon={<MapPin size={18} />} label="Shipping Addresses" />
          <NavItem icon={<Settings size={18} />} label="Account Settings" />
        </nav>

        <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors mt-auto pt-6 border-t border-gray-100 text-sm font-medium">
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white px-8 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-xl font-black text-red-500 tracking-tight">MY ORDERS</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search orders by ID or product..." 
                className="bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-red-200 outline-none"
              />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-bold uppercase tracking-wide">Alex Rivera</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-10">
            {/* Stats Card 1 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Purchases</p>
              <h3 className="text-4xl font-light mb-4">24</h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-red-500 font-bold">Lifetime Value</span>
                <span className="font-bold">$12,480.00</span>
              </div>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Shipments</p>
              <h3 className="text-4xl font-light mb-4">02</h3>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">Arriving soon</span>
                <Truck size={14} className="text-gray-300" />
              </div>
            </div>

            {/* Elite Status Card */}
            <div className="bg-[#1a1a1a] p-6 rounded-3xl shadow-lg text-white">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Membership Status</p>
              <h3 className="text-2xl italic font-serif mb-1">ELITE</h3>
              <p className="text-[10px] text-gray-500">Free priority shipping enabled</p>
            </div>
          </div>

          {/* Order History */}
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">Order History</h3>
            <div className="flex gap-3">
              <button className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest">All Time</button>
              <button className="px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                Filter <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-6 group hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100">
                  <img src={order.image} alt={order.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 tracking-tighter">#{order.id}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                      order.status === 'PROCESSING' ? 'bg-red-500 text-white' : 
                      order.status === 'DELIVERED' ? 'bg-gray-100 text-gray-400' : 'bg-black text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{order.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">Ordered on {order.date}</p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-black mb-1">${order.price}</p>
                  <button className="text-[10px] font-black uppercase tracking-tighter border-b-2 border-red-500 pb-0.5 hover:text-red-500 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-200 pb-1 hover:text-gray-600 transition-colors">
              Load More History
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-0 py-2.5 text-sm font-semibold transition-all ${
    active ? 'text-gray-900 border-r-2 border-red-500' : 'text-gray-400 hover:text-gray-600'
  }`}>
    {icon}
    {label}
  </button>
);

export default MyOrders;