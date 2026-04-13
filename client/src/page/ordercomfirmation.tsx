import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TnksSection from '../components/ordercomfirmation/TnksSection';
import OrderSummery from '../components/ordercomfirmation/ordersummery';

const OrderComfirmation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#1a1a1a]">
      <Navbar />
      <main className="flex-1 max-w-[1000px] mx-auto w-full px-6 py-12">
        <TnksSection />
        <div className="mt-16">
          <OrderSummery />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderComfirmation;