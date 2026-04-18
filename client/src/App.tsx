import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";

// Lazy loading components for better performance
const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const MyOrders = lazy(() => import("./pages/MyOrders"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OrderConfirmation = lazy(() => import("./pages/Orderconformation"));

// Admin/Dashboard components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Users = lazy(() => import("./pages/Users"));
const Orders = lazy(() => import("./pages/Orders"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Application Layout (Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/shipping" element={<Categories />} />
          <Route path="/returns" element={<Categories />} />
          <Route path="/support" element={<Categories />} />
          <Route path="/setting" element={<Categories />} />
          <Route path="/settings" element={<Categories />} />
          <Route path="/notifications" element={<Categories />} />
          <Route path="/collections" element={<Categories />} />
          <Route path="/stock-alerts" element={<Categories />} />
        </Route>
          
        {/* Standalone Pages (No default layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        
        {/* Management/Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}