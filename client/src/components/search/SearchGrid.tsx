import React from "react";
import SearchProductCard from "./SearchProductCard";
import HeadPhone from "../../assets/prod2.svg"
import HeadPhone2 from "../../assets/prod3.svg"

const SearchGrid: React.FC = () => {
  const products = [
    {
      id: "ac-pro-x1",
      name: "Acoustic Pro X1",
      description: "Matte Black Edition",
      price: "$349.00",
      image: HeadPhone,
    },
    {
      id: "cloud-drift",
      name: "Cloud Drift",
      description: "Pure White",
      price: "$299.00",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    },
    {
      id: "master-series-02",
      name: "Master Series 02",
      description: "Gunmetal Silver",
      price: "$599.00",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    },
    {
      id: "retro-core",
      name: "Retro Core",
      description: "Cognac Leather",
      price: "$189.00",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    },
    {
      id: "nano-buds",
      name: "Nano Buds",
      description: "Stealth Black",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=400&h=400&fit=crop",
    },
    {
      id: "quietflow-ultra",
      name: "QuietFlow Ultra",
      description: "Midnight Navy",
      price: "$419.00",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    },
    {
      id: "studio-mon-50",
      name: "Studio Mon 50",
      description: "Pro Audio Edition",
      price: "$249.00",
      image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=400&h=400&fit=crop",
    },
    {
      id: "luxe-bloom",
      name: "Luxe Bloom",
      description: "Rose Gold / Cream",
      price: "$379.00",
      image: HeadPhone2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((product) => (
        <SearchProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default SearchGrid;
