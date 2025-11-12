import React from "react";
import "./Register.css";

export default function Register() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register Here</h2>
        <p className="register-subtitle">
          Join our community of volunteers, parents, and facilitators.
        </p>

        <form>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" required />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="Address">Address</label>
            <input type="text" id="address" name="address" required />
          </div>

          <div className="form-group">
            <label htmlFor="Phone">Phone Number</label>
            <input type="phone" id="phone" name="phone" required />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

/*import React from "react";
import "./Register.css";
function Register() {
  return (
    <div className="register-container">
      <h2> Register Here</h2>
      <form action="">
        <label>
          First Name:
          <input type="text" name="first_name" />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register; */
