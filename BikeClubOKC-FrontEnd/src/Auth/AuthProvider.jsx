// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => {
    const stored = localStorage.getItem("userId");
    return stored ? Number(stored) : null;
  });

  // Decode JWT without extra libraries
  function decodeJWT(jwt) {
    try {
      const payload = jwt.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error("JWT decode failed:", e);
      return null;
    }
  }

  // LOGIN
  function login(jwtToken) {
    // ⭐️ DEBUG LOG #1 — raw token
    console.log("RAW TOKEN RECEIVED:", jwtToken);

    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);

    const decoded = decodeJWT(jwtToken);

    // ⭐️ DEBUG LOG #2 — decoded payload
    console.log("DECODED JWT PAYLOAD:", decoded);

    if (decoded?.id) {
      setUserId(decoded.id);
      localStorage.setItem("userId", decoded.id);

      // ⭐️ DEBUG LOG #3 — success message
      console.log("USER ID SET FROM TOKEN:", decoded.id);
    } else {
      console.error("Token decoded but no id found:", decoded);
    }
  }

  // LOGOUT
  function logout() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  const value = {
    token,
    userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
