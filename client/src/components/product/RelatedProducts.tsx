import ProductCard from "../ui/ProductCard";
import { useProductStore } from "../../store/useProductStore";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const products = useProductStore((state) => state.products);

  // Find up to 4 related products in the same category, excluding the current one
  const related = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  // If not enough in same category, just show other top products
  const displayProducts = related.length >= 4 
    ? related 
    : [...related, ...products.filter(p => p.id !== currentProductId && !related.find(r => r.id === p.id)).slice(0, 4 - related.length)];

  return (
    <div className="pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight uppercase">
        YOU MAY ALSO LIKE
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;