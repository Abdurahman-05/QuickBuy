import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../lib/axios';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [receipt, setReceipt] = useState(null);
  const hasSuccessfulVerification = useRef(false);
  const tx_ref = searchParams.get('tx_ref');
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await api.get(`payments/verify/${tx_ref}`);
        if (data.status === 'success') {
          hasSuccessfulVerification.current = true;
          setStatus('success');
          setReceipt(data.receipt || null);
        } else if (!hasSuccessfulVerification.current) {
          setStatus('failed');
        }
      } catch (err) {
        if (!hasSuccessfulVerification.current) {
          setStatus('failed');
        }
      }
    };

    if (tx_ref) verifyPayment();
  }, [tx_ref]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center">
        {status === 'loading' && <h2 className="text-xl font-black animate-pulse">Verifying Payment...</h2>}
        {status === 'success' && (
          <div className="space-y-6">
            <div className="text-6xl text-green-500 mx-auto">✓</div>
            <h2 className="text-3xl font-black italic">SUCCESSFUL!</h2>
            <p className="text-xs text-gray-500">
              Your receipt is ready below. Please review it before leaving this page.
            </p>
            <div className="text-left rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-400">Payment Receipt</p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">Transaction:</span> {receipt?.tx_ref || tx_ref || "-"}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">Order:</span> {receipt?.orderId || "-"}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">Amount:</span>{" "}
                {typeof receipt?.amount === "number" ? `$${receipt.amount.toFixed(2)}` : "-"}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">Status:</span> {receipt?.paymentStatus || "PAID"}
              </p>
              {receipt?.receiptUrl && (
                <a
                  href={receipt.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-2 text-[11px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 underline"
                >
                  View Payment Receipt
                </a>
              )}
            </div>
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