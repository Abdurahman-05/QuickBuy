import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const tx_ref = searchParams.get('tx_ref');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/payments/verify/${tx_ref}`);
        if (data.status === 'success') {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (err) {
        setStatus('failed');
      }
    };

    if (tx_ref) {
      verifyPayment();
    }
  }, [tx_ref]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center">
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="w-14 h-14 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-black tracking-tight">Verifying Payment...</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Please stay on this page</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-8">
            <div className="text-6xl mx-auto w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center">✓</div>
            <h2 className="text-4xl font-black tracking-tighter italic">THANK YOU!</h2>
            <p className="text-gray-500 font-medium">Your payment was confirmed. We are now processing your order.</p>
            <Link to="/" className="block w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] transition-all">Continue Shopping</Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-8">
            <div className="text-6xl mx-auto w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center">✕</div>
            <h2 className="text-3xl font-black tracking-tighter">PAYMENT FAILED</h2>
            <p className="text-gray-500 font-medium">Something went wrong with your transaction. Please try again or contact support.</p>
            <Link to="/cart" className="block w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black uppercase text-[11px] tracking-widest">Return to Cart</Link>
          </div>
        )}
      </div>
    </div>
  );
}