// src/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles.css"; // your global styles

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="page-center">
        <Outlet />
      </main>
    </>
  );
}
