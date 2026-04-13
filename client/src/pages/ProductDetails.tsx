import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import CustomerReviews from "../components/product/CustomerReviews";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductDetails = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen px-6 py-10 space-y-12">
      <ProductInfo />
      <ProductTabs />
      <CustomerReviews />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;