import React from "react";
import "./Login.css";
export default function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
