import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Parent from "./pages/Parent";
import Volunteer from "./pages/Volunteer";

// import About from "./pages/About";
// import Products from "./pages/Products";
import Login from "./pages/Login";
import ParentRegister from "./pages/ParentRegister";
import VolunteerRegister from "./pages/VolunteerRegister";
import Facilitator from "./pages/Facilitator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="parent" element={<Parent />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="register/parent" element={<ParentRegister />} />
        <Route path="register/volunteer" element={<VolunteerRegister />} />
        <Route path="facilitator" element={<Facilitator />} />
      </Route>
    </Routes>
  );
}
