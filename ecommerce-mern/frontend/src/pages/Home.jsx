import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { API_BASE_URL } from "../api";

const API_URL = `${API_BASE_URL}/api/products`;

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const { data } = await axios.get(API_URL, { params });
      setProducts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // initial load (no filters)
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
  <div>
    <h1 style={{ marginTop: "24px" }}>Products</h1>

    <SearchBar filters={filters} setFilters={setFilters} onSearch={fetchProducts} />

    {products.length === 0 ? (
      <p>No products found 🙂</p>
    ) : (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "18px",
          marginTop: "16px",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    )}
  </div>
);
}

export default Home;
