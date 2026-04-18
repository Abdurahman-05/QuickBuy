import { Link } from "react-router-dom";
import CategoryCard from "../ui/CategoryCard";
import ProductCard from "../ui/ProductCard";
import PromoCard from "../ui/PromoCard";
import { products } from "../../data/products";

const categories = [
  { name: "Beauty picks", image: "/beauty.jpg" },
  { name: "Computer and accessories", image: "/computer.jpg" },
  { name: "Video games", image: "/games.jpg" },
  { name: "Toys and games", image: "/toys.jpg" }
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
  const lastViewed = products.slice(0, 5);
  const topSellers = products.slice(5, 10);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Shop by Categories</h2>
            <Link to="/categories" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">See all <span aria-hidden="true">&rarr;</span></Link>
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
            {lastViewed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>


        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Top Sellers</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {topSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>


        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Explore More</h2>
            <Link to="/products" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">See all <span aria-hidden="true">&rarr;</span></Link>
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

export default CatagorySection;