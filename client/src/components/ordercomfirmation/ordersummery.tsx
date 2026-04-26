import React, { useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import { useOrderStore } from '@/store/useOrderStore';

const OrderSummery: React.FC = () => {
    const { myOrders, getMyOrders } = useOrderStore();

    useEffect(() => {
        getMyOrders();
    }, [getMyOrders]);

    const latestOrder = myOrders[0];
    const subtotal = useMemo(
        () => (latestOrder?.orderItems || []).reduce((sum, item) => sum + item.price * item.quantity, 0),
        [latestOrder]
    );

    return (
        <section className="mb-24 w-full max-w-[850px] mx-auto px-4 sm:px-6">
            <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-8">Order Summary</h2>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                {/* Left - Items List */}
                <div className="flex-1 flex flex-col gap-8">
                    {(latestOrder?.orderItems || []).map((item, index) => (
                        <div key={`${item.product}-${index}`} className="flex gap-5 items-start">
                            <Link to={`/products/${item.product}`} className="w-[100px] h-[100px] bg-[#f8f9fa] rounded-3xl overflow-hidden flex flex-shrink-0 items-center justify-center shadow-md p-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                            </Link>
                            <div className="flex-1 pt-1">
                                <Link to={`/products/${item.product}`} className="text-[15px] font-bold text-black leading-tight mb-1.5 hover:text-red-500 transition-colors block">
                                    {item.name}
                                </Link>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-4">Quantity: {item.quantity}</p>
                            </div>
                            <div className="font-bold text-black text-[15px] pt-1 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                    {!latestOrder && <div className="text-sm text-gray-500">No recent order found.</div>}
                </div>

                {/* Right - Summary Sidebar */}
                <div className="w-full lg:w-[320px] bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 flex-shrink-0">
                    {/* Shipping Address */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Shipping Address</p>
                        <p className="text-[14px] text-black font-medium leading-relaxed">
                            {latestOrder?.shippingAddress?.street || "-"}<br />
                            {latestOrder?.shippingAddress?.city || "-"}, {latestOrder?.shippingAddress?.state || "-"}<br />
                            {latestOrder?.shippingAddress?.country || "-"} {latestOrder?.shippingAddress?.zipCode || ""}
                        </p>
                    </div>
                    {/* Payment Method */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</p>
                        <div className="flex items-center gap-2.5 text-[14px] text-black font-medium">
                            <div className="w-9 h-6 bg-white rounded border border-gray-200 flex flex-col items-center justify-center">
                                <span className="text-[9px] font-black italic tracking-tighter text-[#1434CB]">VISA</span>
                            </div>
                            {latestOrder?.paymentStatus || "PENDING"}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="pt-6 border-t border-gray-200/80 flex flex-col gap-3.5 text-[14px] font-medium">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-black font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 items-center">
                            <span>Shipping</span>
                            <span className="text-red-500 uppercase tracking-widest text-[11px] font-bold">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Tax</span>
                            <span className="text-black font-semibold">${Math.max(0, Number((latestOrder?.totalPrice || 0) - subtotal)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-black mt-2 pt-6 border-t border-black">
                            <span className="text-[12px] uppercase font-bold tracking-widest">Total</span>
                            <span className="text-xl font-bold">${Number(latestOrder?.totalPrice || 0).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200/80">
                        <Link to="/dashboard/orders" className="w-full inline-flex justify-center items-center py-3 rounded-full bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors">
                            View Orders
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSummery;
