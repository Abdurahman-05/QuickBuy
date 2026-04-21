import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";

import "./App.css";
import MainLayout from "./layouts/MainLayout";

// Lazy loading components for better performance
const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Products = lazy(() => import("./pages/Products"));
const Categories = lazy(() => import("./pages/Categories"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Wishlist = lazy(() => import("./pages/user-dashboard/WishList"));
const ProfileOverview = lazy(() => import("./pages/user-dashboard/ProfileOverview"));
const MyOrders = lazy(() => import("./pages/user-dashboard/MyOrders"));
const Addresses = lazy(() => import("./pages/user-dashboard/ShippingAddresses"));
const AccountSettings = lazy(() => import("./pages/user-dashboard/Settings"));
const ProfileLayout = lazy(() => import("./components/user-dashboard/layout/profile/ProfileLayout"));
const OrdersLayout = lazy(() => import("./components/user-dashboard/layout/orders/OrdersLayout"));
const SettingLayout = lazy(() => import("./components/user-dashboard/layout/setting/SettingLayout"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OrderConfirmation = lazy(() => import("./pages/Orderconformation"));

// Admin/Dashboard components
const Dashboard = lazy(() => import("./pages/AdminDashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
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
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/returns" element={<Categories />} />
          <Route path="/support" element={<Categories />} />
          <Route path="/notifications" element={<Categories />} />
          <Route path="/collections" element={<Categories />} />
          <Route path="/stock-alerts" element={<Categories />} />
          <Route path="/checkout" element={<Checkout />}/>
        </Route>

        {/* Standalone Pages (No default layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Management/Dashboard Pages */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/orders" element={<Orders />} />

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<ProfileLayout />}>
          <Route index element={<ProfileOverview />} />
        </Route>

        {/* Orders Dashboard Route */}
        <Route path="/dashboard" element={<OrdersLayout />}>
          <Route path="orders" element={<MyOrders />} />
        </Route>

        <Route path="/dashboard" element={<SettingLayout />}>
          <Route path="settings" element={<AccountSettings />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}