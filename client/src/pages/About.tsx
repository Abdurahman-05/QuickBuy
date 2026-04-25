import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-black mb-4">About QuickBuy</h1>
      <p className="text-gray-500 mb-8 max-w-xl">
        QuickBuy is your destination for premium electronics and modern minimalist tools.
        Our mission is to curate the world's most advanced digital gear for your workspace.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Learn More
      </Link>
    </div>
  );
};

export default About;
