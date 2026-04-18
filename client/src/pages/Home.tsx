import React from 'react';
import Hero from '../components/home/Hero';
import Category from '../components/home/Category';
import ProductSection from '../components/home/ProductSection';
import PromoSection from '../components/home/PromoSection';
import { products } from '../data/products';

const Home: React.FC = () => {
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
