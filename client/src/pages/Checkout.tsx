import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chapaLogo from '../assets/chapa.jpg';
import { useCommerceStore } from '../store/useCommerceStore';
import { useOrderStore } from '../store/useOrderStore';
import { useAuthStore } from '../store/useAuthStore';
import api from '../lib/axios';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('chapa');
  const [address, setAddress] = useState({
    fullName: "", street: "", city: "", state: "", country: "Ethiopia", zipCode: "", phone: "", email: "",
  });

  const navigate = useNavigate();
  const cartItems = useCommerceStore((state) => state.cartItems);
  const clearCart = useCommerceStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const isLoading = useOrderStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCompletePurchase = async () => {
    if (cartItems.length === 0) return;
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      alert("Please fill in all shipping fields.");
      return;
    }

    if (!token) {
      alert("Session expired. Please log in.");
      navigate('/login');
      return;
    }

    try {
      const orderResponse = await createOrder({
        orderItems: cartItems.map((item) => ({
          product: item.id, name: item.name, quantity: item.quantity, image: item.image, price: item.price,
        })),
        shippingAddress: {
          street: address.street, city: address.city, state: address.state, country: address.country, zipCode: address.zipCode,
        },
        totalPrice: Number(total.toFixed(2)),
      });

      const { data } = await api.post("payments/pay", { orderId: orderResponse._id });

      if (data.checkout_url) {
        await clearCart();
        window.location.href = data.checkout_url;
      }

    } catch (err: any) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || "Payment initialization failed.";
      alert(status ? `${message} (HTTP ${status})` : message);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a] pb-20">
      {/* ... (rest of your JSX code remains exactly the same) ... */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-black text-[#E11D48] tracking-tighter">QUICKBUY</Link>
        <Link to="/cart" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Back to Cart</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-4">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-8">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Full Name</label>
                <input type="text" placeholder="Enter full name" value={address.fullName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim()} onChange={(e) => setAddress((prev) => ({ ...prev, fullName: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Street Address</label>
                <input type="text" placeholder="Street" value={address.street} onChange={(e) => setAddress((prev) => ({ ...prev, street: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">City</label>
                <input type="text" value={address.city} onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="space-y-2 relative"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Country</label>
                <select value={address.country} readOnly className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm appearance-none cursor-pointer"><option>Ethiopia</option></select>
                <div className="absolute right-4 bottom-4 pointer-events-none text-gray-400">▾</div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Phone</label>
                <input type="text" value={address.phone} onChange={(e) => setAddress((prev) => ({ ...prev, phone: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Email</label>
                <input type="email" value={address.email || user?.email || ""} onChange={(e) => setAddress((prev) => ({ ...prev, email: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">State</label>
                <input type="text" value={address.state} onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">ZIP Code</label>
                <input type="text" value={address.zipCode} onChange={(e) => setAddress((prev) => ({ ...prev, zipCode: e.target.value }))} className="w-full p-4 bg-[#EDEDED] border-none rounded-md outline-none text-sm" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-4">
              <div onClick={() => setPaymentMethod('chapa')} className="border-2 border-black p-5 rounded-lg flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-11 bg-[#003b44] rounded flex items-center justify-center p-2"><img src={chapaLogo} alt="Chapa" className="h-full w-auto object-contain" /></div>
                  <span className="font-black text-xs tracking-widest uppercase">Chapa</span>
                </div>
                <div className="w-6 h-6 rounded-full border-4 border-black flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full"></div></div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#F6F6F6] p-6 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[40px] sticky top-10">
            <h2 className="text-xl font-bold mb-10 text-gray-800">Order Summary</h2>
            <div className="space-y-8 mb-12">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-5">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm overflow-hidden"><img src={item.image} alt={item.name} className="max-h-full" /></div>
                  <div className="flex-1"><h4 className="font-bold text-sm">{item.name}</h4><p className="text-[11px] text-gray-400 font-bold mt-1">Qty: {item.quantity}</p><p className="font-extrabold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-10 border-t pt-8 border-gray-200"><span className="text-2xl font-bold">Total</span><span className="text-3xl font-black">${total.toFixed(2)}</span></div>
            <button onClick={handleCompletePurchase} disabled={isLoading || cartItems.length === 0} className="w-full py-6 bg-[#1a1a1a] text-white rounded-[20px] font-black tracking-widest text-[11px] uppercase hover:bg-black transition-all shadow-xl disabled:opacity-50">
              {isLoading ? "PROCESSING..." : "Complete Purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}