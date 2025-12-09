import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

// Simple ProtectedRoute
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user"); // will be set after login

  return user ? children : <Navigate to="/login" replace />;
}

import Login from "./pages/Login"; // You will create this page next

function App() {
  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh" }}>
      <Navbar />

      <main
        style={{
          maxWidth: "1000px",
          margin: "24px auto",
          padding: "0 16px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />

          {/* PROTECTED ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
