import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "40px auto",
        background: "#fff",
        padding: "20px 24px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2>Admin Login</h2>
      <p style={{ fontSize: "13px", color: "#4b5563" }}>
        Use <b>admin@shop.com</b> / <b>admin123</b>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "10px", marginTop: "10px" }}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
