import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";



export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${API_BASE_URL}/api/products`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ display: "flex", gap: "30px", marginTop: "30px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "350px",
          height: "350px",
          borderRadius: "14px",
          objectFit: "cover",
        }}
      />

      <div>
        <h1 style={{ marginBottom: "10px" }}>{product.name}</h1>

        <h2 style={{ color: "#16a34a", marginTop: 0 }}>₹{product.price}</h2>

        <p style={{ color: "#4b5563", marginTop: "12px" }}>{product.description}</p>

        {/* ADD TO CART BUTTON */}
        <button
          style={{
            marginTop: "20px",
            padding: "12px 22px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => alert("Added to cart (full cart system coming next!)")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
