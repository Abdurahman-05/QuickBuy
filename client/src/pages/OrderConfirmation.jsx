import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const tx_ref = searchParams.get('tx_ref');
  
  // NEW: Dynamic API URL
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // UPDATED: Dynamic URL
        const { data } = await axios.get(`${API_URL}/payments/verify/${tx_ref}`);
        if (data.status === 'success') {
          setStatus('success');
        } else {
          setStatus('failed');
        }
      } catch (err) {
        setStatus('failed');
      }
    };

    if (tx_ref) verifyPayment();
  }, [tx_ref, API_URL]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center">
        {status === 'loading' && <h2 className="text-xl font-black animate-pulse">Verifying Payment...</h2>}
        {status === 'success' && (
          <div className="space-y-6">
            <div className="text-6xl text-green-500 mx-auto">✓</div>
            <h2 className="text-3xl font-black italic">SUCCESSFUL!</h2>
            <Link to="/" className="block w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[11px]">Go to Dashboard</Link>
          </div>
        )}
        {status === 'failed' && (
          <div className="space-y-6">
            <div className="text-6xl text-red-500 mx-auto">✕</div>
            <h2 className="text-3xl font-black italic text-red-500">FAILED</h2>
            <Link to="/cart" className="block w-full py-5 bg-[#E11D48] text-white rounded-2xl font-black uppercase text-[11px]">Return to Cart</Link>
          </div>
        )}
      </div>
    </div>
  );
}