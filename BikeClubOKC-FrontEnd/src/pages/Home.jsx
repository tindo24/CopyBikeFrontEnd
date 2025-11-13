import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Join Our Community</h1>
        <p className="home-subtitle">Please register if you are a:</p>

        <ul className="home-list">
          <li>Volunteer</li>
          <li>Parent</li>
          <li>Facilitator</li>
        </ul>

        <a href="/register" className="cta-button">
          Register Now
        </a>
      </div>
    </div>
  );
}

/*import React from "react";
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
*/
