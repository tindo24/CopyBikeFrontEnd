// src/pages/Home.jsx
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="home-heading">
        Please Register if you are a <br />
        <span className="list-item">Volunteer</span>
        <br />
        <span className="list-item">Parent</span>
        <br />
        <span className="list-item">Facilitator</span>
      </h2>
      <a href="/register" id="cta-button">
        Register
      </a>
    </div>
  );
}
