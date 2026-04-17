import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import UserProfilePage from "./pages/UserProfilePage";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import OrderConfirmation from "./pages/Orderconformation";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

export default function App() {
  return (
    <Routes>
      {/* Pages WITH navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail" element={<ProductDetails />} />
      </Route>
        
      <Route path="/login" element={<Login />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}