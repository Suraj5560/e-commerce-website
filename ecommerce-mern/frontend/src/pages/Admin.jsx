import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import { API_BASE_URL } from "../api";

const API_URL = `${API_BASE_URL}/api/products`;

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <ProductForm
        onSubmit={handleSubmit}
        initialData={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <h2>All Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "12px",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left" }}>
                Name
              </th>
              <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left" }}>
                Price
              </th>
              <th style={{ borderBottom: "1px solid #e5e7eb", textAlign: "left" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td style={{ padding: "6px 0" }}>{p.name}</td>
                <td style={{ padding: "6px 0" }}>₹{p.price}</td>
                <td style={{ padding: "6px 0" }}>
                  <button onClick={() => setEditingProduct(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} style={{ marginLeft: 8 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
