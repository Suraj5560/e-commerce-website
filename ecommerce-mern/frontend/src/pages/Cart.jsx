import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../api";

const API_URL = `${API_BASE_URL}/api/products`;

export default function Cart() {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (cartItems.length === 0)
    return <p>Your cart is empty. Add something 🙂</p>;

  return (
    <div>
      <h1>Your Cart</h1>

      <div style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              gap: "16px",
              background: "#fff",
              padding: "10px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "90px", height: "90px", borderRadius: "8px", objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: "4px 0", color: "#16a34a", fontWeight: "bold" }}>
                ₹{item.price}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              style={{ marginLeft: "12px" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Total: ₹{totalPrice}</h2>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
