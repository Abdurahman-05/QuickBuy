import React from 'react';
import { Filter, Download, MoreHorizontal, Package } from 'lucide-react';

const AdminDashboard = () => {
  const transactions = [
    { id: '#ORD-1004', name: 'Julienne DiTomasso', amount: '$1,299.00', status: 'PENDING', date: 'Oct 24, 2023' },
    { id: '#ORD-1003', name: 'Marcus Binsley', amount: '$450.00', status: 'PENDING', date: 'Oct 24, 2023' },
    { id: '#ORD-1002', name: 'Sarah Loberman', amount: '$2,400.00', status: 'CANCELED', date: 'Oct 23, 2023' },
    { id: '#ORD-1001', name: 'Benjamin M.', amount: '$99.00', status: 'DELIVERED', date: 'Oct 23, 2023' },
    { id: '#ORD-1000', name: 'Tobias Lindholm', amount: '$150.00', status: 'DELIVERED', date: 'Oct 22, 2023' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'CANCELED': return 'bg-red-50 text-red-600 border-red-200';
      case 'DELIVERED': return 'bg-green-50 text-green-600 border-green-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-500';
      case 'CANCELED': return 'bg-red-500';
      case 'DELIVERED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header section (already handled primarily by sidebar/layout, but page title here) */}
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
         
         <div className="flex bg-gray-100 rounded-full p-1">
             <button className="px-4 py-1.5 bg-white shadow-sm rounded-full text-xs font-semibold">ALL TIME</button>
             <button className="px-4 py-1.5 rounded-full text-gray-500 text-xs font-semibold hover:text-black">12 MONTHS</button>
             <button className="px-4 py-1.5 rounded-full text-gray-500 text-xs font-semibold hover:text-black">30 DAYS</button>
             <button className="px-4 py-1.5 rounded-full text-gray-500 text-xs font-semibold hover:text-black">7 DAYS</button>
             <button className="px-4 py-1.5 rounded-full text-gray-500 text-xs font-semibold hover:text-black">24 HOURS</button>
         </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Highlight Card */}
        <div className="md:col-span-2 bg-gray-100 rounded-3xl p-8 flex justify-between items-center relative overflow-hidden">
             <div className="relative z-10 space-y-4">
                 <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Quarterly Review</p>
                 <h2 className="text-4xl font-extrabold tracking-tight leading-none">ORDER VELOCITY<br/>IS UP 24%</h2>
                 <button className="mt-4 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                     VIEW ANALYTICS <span className="ml-1">→</span>
                 </button>
             </div>
             {/* Decorative element resembling the watch gear from design */}
             <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none grayscale">
                 <img src="https://images.unsplash.com/photo-1587837073080-448bc6a2329b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Gears" className="w-full h-full object-cover" />
             </div>
        </div>

        {/* Small Stats Container */}
        <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center relative">
                <div className="absolute top-6 right-6 text-red-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-1">$142,850.00</h3>
            </div>
            <div className="bg-gray-900 text-white rounded-3xl p-6 flex-1 flex flex-col justify-center relative">
                <div className="absolute top-6 right-6 text-gray-400">
                    <Package size={24} opacity={0.5} />
                </div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-1">Total Shipments</p>
                <h3 className="text-4xl font-bold tracking-tight">842</h3>
            </div>
        </div>
      </div>

      {/* Transaction Log Table */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-lg font-bold tracking-tight">TRANSACTION LOG</h3>
               <p className="text-sm text-gray-500">Displaying your recent 50 orders</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50">
                    <Filter size={14} /> FILTER
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50">
                    <Download size={14} /> EXPORT
                </button>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer Name</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Amount</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Date</th>
                        <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{tx.id}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                       {/* Placeholder avatar initial or generic image */}
                                       <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tx.name}`} alt={tx.name} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{tx.name}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-sm font-semibold text-gray-900">{tx.amount}</td>
                            <td className="py-4 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getStatusColor(tx.status)}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(tx.status)}`}></span>
                                    {tx.status}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-500">{tx.date}</td>
                            <td className="py-4 px-4 text-right">
                                <button className="text-gray-400 hover:text-gray-900 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Pagination placeholder matching the UI dots */}
        <div className="flex items-center justify-center mt-8 gap-2">
            <span className="text-xs text-gray-400 mr-4">Page 1 of 12</span>
            <div className="flex gap-2">
                <button className="w-2 h-2 rounded-full bg-black"></button>
                <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
