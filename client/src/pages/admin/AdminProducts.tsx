import React from 'react';
import { Plus, Search, Filter, Pencil, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      description: 'New M2 Max processor, 32GB RAM',
      category: 'Computing',
      price: '$2,499.00',
      stock: 12,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5',
      description: 'Noise Cancelling Wireless Headphones',
      category: 'Audio',
      price: '$349.00',
      stock: 45,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'Instax Mini Evo',
      description: 'Hybrid Instant Camera',
      category: 'Photography',
      price: '$199.00',
      stock: 0,
      status: 'DRAFT',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200">
         <button className="px-6 py-3 border-b-2 border-black text-sm font-semibold text-black -mb-px">Inventory</button>
         <button className="px-6 py-3 border-b-2 border-transparent text-sm font-semibold text-gray-500 hover:text-black">Collections</button>
         <button className="px-6 py-3 border-b-2 border-transparent text-sm font-semibold text-gray-500 hover:text-black">Stock Alerts</button>
      </div>

      {/* Header section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Products</h1>
              <p className="text-sm text-gray-500">Curating the finest electronics and digital tools for the modern workspace.</p>
          </div>
          <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
              <Plus size={16} /> Add Product
          </button>
      </div>

      {/* Products Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
         {/* Search Bar */}
         <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                </div>
                <input 
                   type="text" 
                   className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white" 
                   placeholder="Search products, SKU or category..."
                />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 ml-4 bg-white">
                <Filter size={14} /> Filters
            </button>
         </div>

         {/* Table */}
         <div className="overflow-x-auto p-4">
             <table className="w-full text-left border-collapse">
                 <thead>
                     <tr className="border-b border-gray-100">
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider min-w-[300px]">Product</th>
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock</th>
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                         <th className="pb-4 pt-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                     {products.map((product) => (
                         <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                             <td className="py-4 px-4">
                                 <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply p-1" />
                                     </div>
                                     <div>
                                         <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                         <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] truncate">{product.description}</p>
                                     </div>
                                 </div>
                             </td>
                             <td className="py-4 px-4 text-sm font-medium text-gray-600">{product.category}</td>
                             <td className="py-4 px-4 text-sm font-bold text-gray-900">{product.price}</td>
                             <td className="py-4 px-4">
                                 <div className="flex flex-col">
                                     <span className="text-sm font-bold text-gray-900">{product.stock} in stock</span>
                                     {product.stock === 0 && <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Out of stock</span>}
                                 </div>
                             </td>
                             <td className="py-4 px-4">
                                 {product.status === 'ACTIVE' ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border bg-green-50 text-green-700 border-green-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        ACTIVE
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border bg-gray-100 text-gray-600 border-gray-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                        DRAFT
                                    </span>
                                 )}
                             </td>
                             <td className="py-4 px-4">
                                 <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                                         <Pencil size={14} />
                                     </button>
                                     <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                         <Trash2 size={14} />
                                     </button>
                                 </div>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>

         {/* Pagination */}
         <div className="p-6 border-t border-gray-100 flex items-center justify-center text-sm text-gray-500 gap-6">
             <span>Showing 1-12 of 45 products</span>
             <div className="flex items-center gap-1">
                 <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-xs font-semibold">1</button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-xs font-semibold transition-colors">2</button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 text-xs font-semibold transition-colors">3</button>
                 <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs transition-colors">&gt;</button>
             </div>
         </div>
      </div>
    </div>
  );
};

export default AdminProducts;
