import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] font-black text-gray-100 leading-none select-none">404</h1>
      <h2 className="text-3xl font-extrabold text-black -mt-8 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
