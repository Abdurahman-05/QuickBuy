import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/utils/ScrollToTop";
import { useAuthStore } from "./store/useAuthStore";
import { useCommerceStore } from "./store/useCommerceStore";
import { ProtectedRoute, AdminRoute, GuestRoute, UserRoute, StorefrontRoute } from "./components/layout/AuthGuard";

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
const DashboardLayout = lazy(() => import("./components/user-dashboard/layout/DashboardLayout"));

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OrderConfirmation = lazy(() => import("./pages/Orderconformation"));

// Admin/Dashboard components
const Dashboard = lazy(() => import("./pages/AdminDashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const Users = lazy(() => import("./pages/Users"));
const Orders = lazy(() => import("./pages/Orders"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component — Modern and Fast
const PageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="relative flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-[3px] border-gray-100 border-t-[#e60000] rounded-full animate-spin"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">QuickBuy</p>
    </div>
  </div>
);

export default function App() {
  const location = useLocation();
  const getMe = useAuthStore((state) => state.getMe);
  const token = useAuthStore((state) => state.token);
  const fetchCart = useCommerceStore((state) => state.fetchCart);

  useEffect(() => {
    if (token) {
      getMe();
      fetchCart();
    }
  }, [getMe, fetchCart, token]);

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <div key={location.pathname} className="animate-page-entry">
      <Routes location={location}>
        {/* Main Application Layout (Navbar + Footer) */}
        <Route element={<StorefrontRoute><MainLayout /></StorefrontRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/returns" element={<Categories />} />
          <Route path="/shipping" element={<Categories />} />
          <Route path="/support" element={<Categories />} />
          <Route path="/notifications" element={<Categories />} />
          <Route path="/collections" element={<Categories />} />
          <Route path="/stock-alerts" element={<Categories />} />
          <Route 
            path="/checkout" 
            element={
              <UserRoute>
                <Checkout />
              </UserRoute>
            } 
          />
        </Route>

        {/* Standalone Pages (No default layout) */}
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          } 
        />
        <Route 
          path="/reset-password/:token" 
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          } 
        />
        <Route 
          path="/order-confirmation" 
          element={
            <UserRoute>
              <OrderConfirmation />
            </UserRoute>
          } 
        />

        {/* Management/Dashboard Pages */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <Navigate to="/admin/dashboard" replace />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } 
        />
        <Route 
          path="/addproduct" 
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          } 
        />

        {/* Unified User Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <UserRoute>
              <DashboardLayout />
            </UserRoute>
          }
        >
          <Route index element={<ProfileOverview />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </Suspense>
  );
}