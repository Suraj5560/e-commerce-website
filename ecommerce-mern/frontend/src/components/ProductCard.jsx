import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.15s ease, boxShadow 0.15s ease",
      }}
    >
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />

        <h3 style={{ fontSize: "18px", margin: "12px 0 6px" }}>{product.name}</h3>

        <p style={{ fontSize: "16px", color: "#16a34a", fontWeight: "bold", margin: 0 }}>
          ₹{product.price}
        </p>

        <p style={{ color: "#4b5563", marginTop: "6px" }}>{product.description}</p>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "10px 16px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
        }}
        onClick={() => alert("Added to cart (cart system coming soon!)")}
      >
        Add to Cart
      </button>
    </div>
  );
}
