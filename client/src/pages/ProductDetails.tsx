import { useParams, Navigate } from "react-router-dom";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import CustomerReviews from "../components/product/CustomerReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useProductStore((state) => state.product);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);
  const getProductById = useProductStore((state) => state.getProductById);
  const products = useProductStore((state) => state.products);
  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const isDifferentProductLoaded = !!product && !!id && product.id !== id;

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getProductById(id).catch(() => undefined);
  }, [id, getProductById]);

  useEffect(() => {
    if (products.length === 0) {
      getAllProducts();
    }
  }, [products.length, getAllProducts]);

  if ((isLoading && !product) || isDifferentProductLoaded) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">{error}</p>
        </div>
      </div>
    );
  }

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