import React from "react";
import { Link } from "react-router-dom";
import "../style/LoginPage.css";
import logo from "../images/logo.png";

export default function LoginPage() {
  return (
    <div className="login-container">
      <img src={logo} alt="Website Logo" className="logo" />
      <h1>Login</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
