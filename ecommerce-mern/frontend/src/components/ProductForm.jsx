import { useEffect, useState } from "react";

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        image: initialData.image,
      });
    } else {
      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "8px",
        marginBottom: "20px",
        padding: "12px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        backgroundColor: "#f9fafb",
      }}
    >
      <h2 style={{ margin: 0 }}>{initialData ? "Edit Product" : "Add Product"}</h2>

      <input
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        rows={3}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit">
          {initialData ? "Update Product" : "Add Product"}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
