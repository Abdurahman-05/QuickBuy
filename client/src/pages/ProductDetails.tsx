import { useParams, Navigate } from "react-router-dom";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import CustomerReviews from "../components/product/CustomerReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import { products } from "../data/products";
import { useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen px-4 sm:px-6 py-10 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <ProductInfo product={product} />
        <ProductTabs product={product} />
        <CustomerReviews product={product} />
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetails;