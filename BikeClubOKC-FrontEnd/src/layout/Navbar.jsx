import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "./Navbar.css"; // optional for styling

export default function Navbar() {
  const { role, isFacilitator, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // 🚫 Hide navbar on login page
  if (location.pathname === "/login") return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" end>
          Home
        </NavLink>

        {/* Parent Link */}
        {token && role === "parent" && <NavLink to="/parent">Parent</NavLink>}

        {/* Volunteer Link */}
        {token && role === "volunteer" && (
          <NavLink to="/volunteer">Volunteer</NavLink>
        )}

        {/* Facilitator Link */}
        {token && role === "volunteer" && isFacilitator && (
          <NavLink to="/facilitator">Facilitator</NavLink>
        )}
      </div>

      {/* ---------- RIGHT SIDE PROFILE MENU ---------- */}
      {token && (
        <div className="nav-right">
          <div className="profile-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="profile-label">
              {role === "parent" && "Parent"}
              {role === "volunteer" && !isFacilitator && "Volunteer"}
              {role === "volunteer" && isFacilitator && "Facilitator"}
              &nbsp;▼
            </span>

            {menuOpen && (
              <div className="profile-dropdown">
                <button onClick={() => navigate(`/${role}`)}>
                  My Dashboard
                </button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/*import React from "react";
import { NavLink } from "react-router-dom";
//import "./Navbar.css"; // Optional: if you want separate Navbar CSS

export default function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Login
      </NavLink>
      <NavLink
        to="/parent"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Parent
      </NavLink>
      <NavLink
        to="/volunteer"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Volunteer
      </NavLink>
      <NavLink
        to="/facilitator"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Facilitator
      </NavLink>
    </nav>
  );
}
*/
