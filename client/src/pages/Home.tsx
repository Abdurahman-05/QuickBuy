import React from 'react';
import Hero from '../components/home/Hero';
import Category from '../components/home/Category';
import ProductSection from '../components/home/ProductSection';
import PromoSection from '../components/home/PromoSection';

// SVG Imports (Existing assets)
import potSvg from '../assets/pot.svg';
import chargerSvg from '../assets/charger.svg';
import soupmakerSvg from '../assets/soupmaker.svg';
import tvSvg from '../assets/smarttv.svg';
import ironSvg from '../assets/watt.svg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: [string, string, string, string]; // Exactly 4 images
  category: string;
  rating: number;
  stockInfo: string;
  recommended?: boolean;
  description: string;
  specifications: { label: string; value: string }[];
  reviews: { author: string; rating: number; text: string; avatar?: string }[];
}

export const products: Product[] = [
  {
    id: 'airforce-1',
    name: "White AirForce 1's, size 7-9",
    price: 112.55,
    originalPrice: 150.00,
    image: "/white-af1.png",
    images: ["/white-af1.png", "/white-af1.png", "/white-af1.png", "/white-af1.png"],
    category: "Footwear",
    rating: 5,
    stockInfo: "21 pair left in stock",
    description: "Classic court style meets modern comfort. These iconic sneakers feature premium leather and responsive cushioning.",
    specifications: [{ label: "Material", value: "Leather" }, { label: "Sole", value: "Rubber" }],
    reviews: [{ author: "Sarah J.", rating: 5, text: "Absolutely incredible style. They fit perfectly." }]
  },
  {
    id: 'oxford-shoe',
    name: "Oxford shoe - Black- sam",
    price: 300.45,
    image: "/oxford.png",
    images: ["/oxford.png", "/oxford.png", "/oxford.png", "/oxford.png"],
    category: "Footwear",
    rating: 3,
    stockInfo: "not available in stock",
    description: "Handcrafted leather oxfords for the modern gentleman. Timeless design with a high-shine finish.",
    specifications: [],
    reviews: []
  },
  {
    id: 'air-jordan-1',
    name: "Air Jordan 1's",
    price: 220.55,
    image: "/jordan1.jpg",
    images: ["/jordan1.jpg", "/jordan1.jpg", "/jordan1.jpg", "/jordan1.jpg"],
    category: "Footwear",
    rating: 5,
    stockInfo: "50 pair left in stock",
    description: "The sneaker that started it all. Premium construction and bold coloring make this a must-have.",
    specifications: [],
    reviews: []
  },
  {
    id: 'jordan-4-military',
    name: "Jordan 4 - Military Blue",
    price: 400.00,
    originalPrice: 450.00,
    image: "/jordan4.jpg",
    images: ["/jordan4.jpg", "/jordan4.jpg", "/jordan4.jpg", "/jordan4.jpg"],
    category: "Footwear",
    rating: 5,
    stockInfo: "10 pair left in stock",
    recommended: true,
    description: "A cultural icon returns. The Jordan 4 'Military Blue' features the classic colorway.",
    specifications: [],
    reviews: []
  },
  {
      id: 'new-balance-runners',
      name: "New Balance - Runners- Men",
      price: 92.88,
      image: "/newbalance.png",
      images: ["/newbalance.png", "/newbalance.png", "/newbalance.png", "/newbalance.png"],
      category: "Footwear",
      rating: 5,
      stockInfo: "21 pair left in stock",
      description: "Performance meets everyday style. Lightweight and breathable for all-day comfort.",
      specifications: [],
      reviews: []
  },
  {
    id: 'wireless-headphones',
    name: "Bluetooth Wireless Headphones",
    price: 33.00,
    originalPrice: 71.34,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000", "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1000"],
    category: "Electronics",
    rating: 5,
    stockInfo: "15 left in stock",
    recommended: true,
    description: "Experience studio-quality sound with our flagship wireless headphones.",
    specifications: [
        { label: "Driver Size", value: "40mm Dynamic" },
        { label: "Battery Life", value: "40 Hours" }
    ],
    reviews: [
        { author: "Sarah J.", rating: 5, text: "Absolutely incredible soundstage.", avatar: "https://i.pravatar.cc/150?u=sarah" },
        { author: "Michael R.", rating: 4, text: "ANC works perfectly.", avatar: "https://i.pravatar.cc/150?u=mike" },
        { author: "David L.", rating: 5, text: "The build quality feels very premium.", avatar: "https://i.pravatar.cc/150?u=david" }
    ]
  },
  {
    id: 'instant-pot',
    name: "Instant Pot Duo Plus, 6-Quart Whisper",
    price: 31.88,
    image: potSvg,
    images: [potSvg, "/instantpot.jpg", potSvg, potSvg],
    category: "Kitchen",
    rating: 5,
    stockInfo: "21 left in stock",
    recommended: true,
    description: "Cook faster, eat healthier. The 9-in-1 multicooker that replaces your pressure cooker.",
    specifications: [],
    reviews: []
  },
  {
      id: 'portable-charger',
      name: "INIU Portable Charger",
      price: 18.90,
      image: chargerSvg,
      images: [chargerSvg, "/charger.jpg", chargerSvg, chargerSvg],
      category: "Electronics",
      rating: 4,
      stockInfo: "not available in stock",
      description: "The thinnest 10000mAh power bank on the market.",
      specifications: [],
      reviews: []
  },
  {
      id: 'soup-maker',
      name: "Philips Viva Collection SoupMaker",
      price: 8.90,
      image: soupmakerSvg,
      images: [soupmakerSvg, "/soupmaker.jpg", soupmakerSvg, soupmakerSvg],
      category: "Kitchen",
      rating: 5,
      stockInfo: "10 left in stock",
      recommended: true,
      description: "Creamy soups in minutes.",
      specifications: [],
      reviews: []
  },
  {
      id: 'smart-tv',
      name: "VIZIO 32-inch HD Smart TV 720p LED",
      price: 80.33,
      image: tvSvg,
      images: [tvSvg, "/tv.jpg", tvSvg, tvSvg],
      category: "Electronics",
      rating: 4,
      stockInfo: "Re-stocked soon",
      recommended: true,
      description: "Stream everything you love.",
      specifications: [],
      reviews: []
  },
  {
      id: 'steam-iron',
      name: "Sunbeam Steammaster 1400 Watt Iron",
      price: 18.88,
      image: ironSvg,
      images: [ironSvg, "/iron.jpg", ironSvg, ironSvg],
      category: "Home",
      rating: 5,
      stockInfo: "Re-stocked soon",
      description: "Wrinkle-free results.",
      specifications: [],
      reviews: []
  },
  // Adding more products to achieve category depth
  {
      id: 'smart-watch',
      name: "Pro Watch Series 8",
      price: 129.00,
      image: "/test.jpg",
      images: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
      category: "Electronics",
      rating: 5,
      stockInfo: "In Stock",
      description: "The ultimate health and fitness companion.",
      specifications: [],
      reviews: []
  },
  {
      id: 'bt-speaker',
      name: "Boom Port Speaker",
      price: 85.00,
      image: "/test.jpg",
      images: ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"],
      category: "Electronics",
      rating: 4,
      stockInfo: "Low Stock",
      description: "Portable 360-degree sound.",
      specifications: [],
      reviews: []
  },
  {
      id: 'coffee-maker',
      name: "Nespresso Essenza Mini",
      price: 149.99,
      image: "/instantpot.jpg",
      images: ["/instantpot.jpg", "/instantpot.jpg", "/instantpot.jpg", "/instantpot.jpg"],
      category: "Kitchen",
      rating: 5,
      stockInfo: "In Stock",
      description: "Modern design with ultra-compact size.",
      specifications: [],
      reviews: []
  },
  {
      id: 'air-fryer',
      name: "Ninja Air Fryer XL",
      price: 119.00,
      image: "/soupmaker.jpg",
      images: ["/soupmaker.jpg", "/soupmaker.jpg", "/soupmaker.jpg", "/soupmaker.jpg"],
      category: "Kitchen",
      rating: 5,
      stockInfo: "In Stock",
      description: "Guilt-free fried food.",
      specifications: [],
      reviews: []
  },
  {
      id: 'blender-pro',
      name: "Vitamix Explorian Series",
      price: 289.00,
      image: "/soupmaker.jpg",
      images: ["/soupmaker.jpg", "/soupmaker.jpg", "/soupmaker.jpg", "/soupmaker.jpg"],
      category: "Kitchen",
      rating: 5,
      stockInfo: "In Stock",
      description: "Professional grade power in your kitchen.",
      specifications: [],
      reviews: []
  },
  {
      id: 'vacuum-cleaner',
      name: "Dyson V11 Cordless Vacuum",
      price: 499.00,
      image: "/iron.jpg",
      images: ["/iron.jpg", "/iron.jpg", "/iron.jpg", "/iron.jpg"],
      category: "Home",
      rating: 5,
      stockInfo: "Low Stock",
      description: "Deep cleans anywhere.",
      specifications: [],
      reviews: []
  },
  {
      id: 'tower-fan',
      name: "Dyson Pure Cool Link",
      price: 329.00,
      image: "/iron.jpg",
      images: ["/iron.jpg", "/iron.jpg", "/iron.jpg", "/iron.jpg"],
      category: "Home",
      rating: 4,
      stockInfo: "Out of Stock",
      description: "Cleans the air you breathe.",
      specifications: [],
      reviews: []
  },
  {
      id: 'electric-drill',
      name: "DEWALT 20V Max Drill",
      price: 149.00,
      image: "/iron.jpg",
      images: ["/iron.jpg", "/iron.jpg", "/iron.jpg", "/iron.jpg"],
      category: "Home",
      rating: 5,
      stockInfo: "In Stock",
      description: "Unmatched performance and durability.",
      specifications: [],
      reviews: []
  },
  {
      id: 'led-desk-lamp',
      name: "Modern Task Lamp",
      price: 45.00,
      image: "/iron.jpg",
      images: ["/iron.jpg", "/iron.jpg", "/iron.jpg", "/iron.jpg"],
      category: "Home",
      rating: 5,
      stockInfo: "In Stock",
      description: "Sleek and energy efficient.",
      specifications: [],
      reviews: []
  }
];

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
