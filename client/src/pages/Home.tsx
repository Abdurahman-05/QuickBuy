import React from 'react';
import Hero from '../components/home/Hero';
import Category from '../components/home/Category';
import ProductSection from '../components/home/ProductSection';
import PromoSection from '../components/home/PromoSection';
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

const Home: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  useEffect(() => {
    if (products.length === 0) {
      getAllProducts();
    }
  }, [getAllProducts, products.length]);

  const lastViewedProducts = products.slice(0, 5); 
  const topSellers = products.slice(5, 10);

  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <Category />
      <ProductSection title="Last viewed" products={lastViewedProducts} />
      <ProductSection title="Top sellers" products={topSellers} />
      <PromoSection />
    </main>
  );
};

export default Home;
