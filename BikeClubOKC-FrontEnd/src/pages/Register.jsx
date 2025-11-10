import React from "react";
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
          <input type="text" name="password" />
        </label>
      </form>
    </div>
  );
}

export default Register;
