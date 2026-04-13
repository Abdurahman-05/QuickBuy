import { useState } from "react";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");

  const colors = ["black", "gray", "blue"];

  return (
    <div className="grid md:grid-cols-2 gap-10">

      {/* LEFT */}
      <div>
        <div className="bg-white rounded-lg p-6 flex justify-center">
          <img
            src="/headphone.webp"
            className="w-80 object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4">
          {[1, 2, 3, 4].map((item) => (
            <img
              key={item}
              src="/headphone.webp"
              className="w-16 h-16 object-cover rounded-md border cursor-pointer hover:border-black"
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-5 max-w-md">

        <h1 className="text-3xl font-bold">
          Bluetooth Wireless Headphones
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-red-500">★★★★★</span>
          <span className="text-gray-500">4.5/5 from 11k+ reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">$33.00</span>
          <span className="text-gray-400 line-through">$71.34</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">
          Experience studio-quality sound with advanced noise cancellation and long battery life.
        </p>

        {/* Colors */}
        <div>
          <p className="text-xs font-semibold mb-2 uppercase">Color Selection</p>
          <div className="flex gap-3">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-transparent"
                  }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="text-sm">Quantity</span>
          <div className="flex items-center border rounded-md px-3 py-1 gap-3">
            <button onClick={() => setQuantity(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-full">
            ADD TO CART
          </button>
          <button className="text-sm font-medium">BUY NOW</button>
        </div>

        {/* Extra Info */}
        <div className="flex gap-6 text-sm text-gray-500">
          <span>🚚 Free Shipping</span>
          <span>🛡 2 Year Warranty</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;