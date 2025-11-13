import React from "react";
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
    </nav>
  );
}
