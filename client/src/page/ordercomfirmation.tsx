import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderConfirmation: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Tnkssection />
      <OrderSummary />
      <Footer />
    </div>
  );
};

export default OrderConfirmation;