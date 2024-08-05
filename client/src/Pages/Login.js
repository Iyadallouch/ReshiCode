import React from "react";
import { Link } from "react-router-dom";
import "../style/LoginPage.css";
// import logo from "../images/logo.png";

export default function LoginPage() {
  return (
    <div className="login-container">
      {/* <img src={logo} alt="Website Logo" className="login-logo" /> */}
      <h1 className="login-letter">Login</h1>
      <form className="login-form">
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <Link to="/userhomepage" className="login-notLink">
          <button type="submit" className="login-submit-button">
            Login
          </button>
        </Link>

        <p className="login-p">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
