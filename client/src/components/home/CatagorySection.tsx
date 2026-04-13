import CategoryCard from "../ui/CategoryCard";
import Footer from "../ui/Footer"
import Navbar from "../ui/Navbar"
import PrimaryPillButton from "../ui/PrimaryPillButton";
import ProductCard from "../ui/ProductCard";
import PromoCard from "../ui/PromoCard";

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

function CatagorySection() {
  return (
    <div>
   
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

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
    </div>
  )
}

export default CatagorySection