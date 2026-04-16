import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import UserProfilePage from "./pages/UserProfilePage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <Routes>
      {/* Pages WITH navbar + footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail" element={<ProductDetails />} />
      </Route>

        <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}