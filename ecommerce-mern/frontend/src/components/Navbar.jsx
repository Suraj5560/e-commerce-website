import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const linkStyle = (path) => ({
    textDecoration: "none",
    fontWeight: location.pathname === path ? 700 : 500,
    color: location.pathname === path ? "#4f46e5" : "#4b5563",
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        background: "#ffffff",
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#4f46e5" }}>
        E-Shop
      </h1>

      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>
          Home
        </Link>
        <Link to="/cart" style={linkStyle("/cart")}>
          Cart ({cartCount})
        </Link>
        <Link to="/admin" style={linkStyle("/admin")}>
          Admin
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
