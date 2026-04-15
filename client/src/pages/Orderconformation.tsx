import React from 'react';
import TnksSection from '../components/ordercomfirmation/TnksSection';
import OrderSummery from '../components/ordercomfirmation/ordersummery';

const OrderConfirmation: React.FC = () => {
  return (
    <main className="flex-1 w-full bg-white flex flex-col justify-center pb-20 pt-8">
      <TnksSection />
      <OrderSummery />
    </main>
  );
};

export default OrderConfirmation;