import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { ShieldCheck, Truck } from "lucide-react"

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Sync selected image if product changes
  useEffect(() => {
    setSelectedImage(product.image);
  }, [product]);

  const colors = ["black", "gray", "blue"];

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* LEFT: Image Gallery */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-8 flex justify-center items-center shadow-sm border border-gray-100 aspect-square overflow-hidden">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`aspect-square bg-white rounded-xl p-2 border-2 cursor-pointer transition-all ${selectedImage === img ? "border-black shadow-md" : "border-transparent hover:border-gray-200"
                }`}
            >
              <img
                src={img}
                alt={`${product.name} thumb ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div className="space-y-6 max-w-lg">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < product.rating ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-gray-500 font-medium">
              {product.rating}.0/5 from {product.reviews.length}+ reviews
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-black text-black tracking-tighter">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-400 line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-sm text-gray-600 leading-relaxed">
          <p>{product.description}</p>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Color Selection
          </p>
          <div className="flex gap-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? "border-black scale-110" : "border-transparent hover:scale-105"
                  }`}
                style={{ backgroundColor: color }}
                aria-label={color}
              >
                <div className={`w-full h-full rounded-full border border-black/10`} />
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-8 py-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Quantity</p>
            <div className="flex items-center border-2 border-gray-100 rounded-xl px-4 py-2 gap-6 bg-gray-50/50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-xl font-bold hover:text-red-500 transition-colors"
              >
                -
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-xl font-bold hover:text-green-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Stock Availability</p>
            <p className={`text-sm font-bold ${product.stockInfo.includes('Out') || product.stockInfo.includes('not') ? 'text-red-500' : 'text-emerald-600'}`}>
              {product.stockInfo}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full">
          <Link to="/cart" className="w-full sm:flex-1">
            <button className="w-full bg-black text-white px-8 py-5 rounded-2xl font-bold shadow-xl hover:bg-gray-800 transition-all active:scale-95 text-sm uppercase tracking-widest text-center">
              ADD TO CART
            </button>
          </Link>
          <Link to="/cart" className="w-full sm:flex-[0.5]">
            <button className="w-full bg-gray-100 text-black px-8 py-5 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95 text-sm uppercase tracking-widest text-center">
              BUY NOW
            </button>
          </Link>
        </div>

        {/* Extra Info */}
        <div className="flex gap-8 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Truck />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-gray-900">Free Shipping</p>
              <p className="text-[10px] text-gray-500">On all orders over $100</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-gray-900">2 Year Warranty</p>
              <p className="text-[10px] text-gray-500">Official brand support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;