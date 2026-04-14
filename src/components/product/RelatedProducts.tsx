const products = [
  { name: "Smart Watch", price: "$120", img: "/watch.webp" },
  { name: "Earbuds", price: "$80", img: "/earbuds.webp" },
  { name: "Speaker", price: "$150", img: "/speaker.webp" },
  { name: "Laptop", price: "$900", img: "/laptop.webp" },
];

const RelatedProducts = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">
        YOU MAY ALSO LIKE
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-xl">
            <img src={product.img} className="w-full h-32 object-contain" />
            <p className="mt-2 text-sm">{product.name}</p>
            <p className="font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;