import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const login = (email, password) => {
    // hard-coded admin credentials
    if (email === "admin@shop.com" && password === "admin123") {
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
