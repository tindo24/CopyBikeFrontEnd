import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import "./Login.css";

// ⬅️ Import backend login API functions
import { parentLogin, volunteerLogin } from "../auth/authAPI";

export default function Login() {
  const { login } = useAuth();

  const [role, setRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [readyToContinue, setReadyToContinue] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("---- LOGIN ATTEMPT ----");
      console.log("Role:", role);
      console.log("Email:", email);

      let jwtToken;

      // Call correct backend route
      if (role === "parent") {
        jwtToken = await parentLogin(email, password);
      } else {
        jwtToken = await volunteerLogin(email, password);
      }

      console.log("RAW TOKEN RECEIVED:", jwtToken);

      // Store token + decode userId
      login(jwtToken);

      alert("Login successful — Debug Mode ON!");
      setReadyToContinue(true);
    } catch (err) {
      console.error("Login FAILED:", err);
      alert("Invalid email or password");
    }
  }

  function handleContinue() {
    if (role === "parent") window.location.href = "/parent";
    if (role === "volunteer") window.location.href = "/volunteer";
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="parent">Parent</option>
            <option value="volunteer">Volunteer</option>
          </select>

          <input
            type="text"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Continue Button */}
        {readyToContinue && (
          <button
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              borderRadius: "8px",
              background: "#0f75bc",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleContinue}
          >
            Continue to Dashboard →
          </button>
        )}
      </div>
    </div>
  );
}

/*import React from "react";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Log in to access your account</p>

        <form className="login-form">
          <label>
            <input type="text" placeholder="email" required />
          </label>
          <label>
            <input type="password" placeholder="Password" required />
          </label>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <a href="/register" className="register-link">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
*/
