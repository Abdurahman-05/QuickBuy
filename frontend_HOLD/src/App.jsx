import { Routes, Route } from "react-router-dom";
import "./App.css";

// Only import Login for now to stop the crashes
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col bg-[#f5f5f5]">
      <div className="flex-grow">
        <Routes>
          {/* This makes Login the first thing you see */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}