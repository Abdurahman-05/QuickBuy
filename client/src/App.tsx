import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrimaryPillButton from "./components/PrimaryPillButton";
import CategoryCard from "./components/CategoryCard";
import ProductCard from './components/ProductCard';
import PromoCard from "./components/PromoCard";



const products = [
  {
    name: "White AirForce 1's, size 7-9",
    price: 112.55,
    stock: 21,
    rating: 5,
    image: "/white-af1.png"
  },
  {
    name: "Oxford shoe - Black sam",
    price: 300.45,
    stock: 10,
    rating: 4,
    image: "/oxford.png"
  },
  {
    name: "Air Jordan 1's",
    price: 220.55,
    stock: 30,
    rating: 5,
    image: "/jordan1.jpg"
  },
  {
    name: "Jordan 4 - Military Blue",
    price: 400.00,
    stock: 12,
    rating: 5,
    image: "/jordan4.jpg"
  },
  {
    name: "New Balance - Runners",
    price: 92.88,
    stock: 7,
    rating: 4,
    image: "/newbalance.png"
  }
];

const categories = [
  { name: "Beauty picks", image: "/beauty.jpg" },
  { name: "Computer and accessories", image: "/computer.jpg" },
  { name: "Video games", image: "/games.jpg" },
  { name: "Toys and games", image: "/toys.jpg" }
];

const topSellers = [
  {
    name: "Instant Pot Duo Plus",
    price: 31.88,
    stock: 21,
    rating: 4,
    image: "/instantpot.jpg"
  },
  {
    name: "INIU Portable Charger",
    price: 18.90,
    stock: 0,
    rating: 4,
    image: "/charger.jpg"
  },
  {
    name: "Philips SoupMaker",
    price: 8.90,
    stock: 10,
    rating: 5,
    image: "/soupmaker.jpg"
  },
  {
    name: "VIZIO 32-inch TV",
    price: 80.33,
    stock: 5,
    rating: 4,
    image: "/tv.jpg"
  },
  {
    name: "Steamaster Iron",
    price: 18.88,
    stock: 0,
    rating: 4,
    image: "/iron.jpg"
  }
];

const promos = [
  {
    title: "Comfy style for her.",
    description:
      "Shop from quickbuy fashion including shoes, clothes, handbags and much more.",
    image: "/promo-her.jpg"
  },
  {
    title: "Comfy style for him.",
    description:
      "Shop from quickbuy fashion including shoes, clothes, handbags and much more.",
    image: "/mens-fashion.jpg"
  }
];

export default function App() {
  return (
    <div className="app min-h-screen">
      <Navbar />
      <section className="flex flex-grow items-center justify-center px-6 py-12">
        <PrimaryPillButton
          label="Shop now"
          icon={
            <svg
              width="34"
              height="30"
              viewBox="0 0 34 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.9507 24.31C26.6685 24.31 27.3867 24.6177 27.8995 25.1305C28.4124 25.6433 28.7201 26.3615 28.7201 27.1821C28.7201 28.7206 27.4891 29.9516 25.9506 29.9516C25.13 29.9516 24.4121 29.6438 23.899 29.131C23.3862 28.6182 23.0785 27.9 23.0785 27.1821C23.0785 26.3616 23.3862 25.6436 23.899 25.1306C24.4119 24.6178 25.13 24.31 25.9506 24.31L25.9507 24.31ZM15.3856 13.3347C14.7701 13.3347 14.36 12.8219 14.36 12.2064C14.36 11.5909 14.7704 11.0781 15.3856 11.0781H23.2839C23.8993 11.0781 24.4122 11.5909 24.4122 12.2064C24.4122 12.8219 23.8993 13.3347 23.2839 13.3347H15.3856ZM31.1821 5.4365C31.2847 4.82101 31.9 4.41086 32.5155 4.51327C33.131 4.61594 33.5411 5.23115 33.4387 5.84668L30.7719 21.1301C30.6692 21.7456 30.054 22.0533 29.5409 22.0533H9.12896C8.51347 22.0533 8.10332 21.5405 8.00064 21.1301L4.71836 2.25664H1.12832C0.512827 2.25664 0 1.74381 0 1.12832C0 0.512827 0.512827 0 1.12832 0H5.64159C6.15442 0 6.66723 0.410416 6.76991 0.92323L10.0522 19.7967L28.7206 19.8994L31.1823 5.4363L31.1821 5.4365ZM12.8217 24.31C13.6422 24.31 14.2578 24.6177 14.7706 25.1305C15.2834 25.6433 15.5911 26.3615 15.5911 27.1821C15.5911 28.7206 14.3601 29.9516 12.8216 29.9516C12.1037 29.9516 11.3855 29.6438 10.8727 29.131C10.3599 28.6182 10.0522 27.9 10.0522 27.1821C10.0522 26.3616 10.3599 25.6436 10.8727 25.1306C11.3856 24.6178 12.0011 24.31 12.8216 24.31L12.8217 24.31Z"
                fill="white"
              />
            </svg>
          }
        />
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Shop by Categories</h2>
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">See all <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={i} category={cat} />
            ))}
          </div>
        </section>

        {/* Last Viewed */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Last Viewed</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </section>

        {/* Top Sellers */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Top Sellers</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {topSellers.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </section>

        {/* Promos */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Explore More</h2>
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">See all <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {promos.map((promo, index) => (
              <PromoCard key={index} promo={promo} />
            ))}
          </div>
        </section>
      </div>


      <Footer />
    </div>
  );
}
