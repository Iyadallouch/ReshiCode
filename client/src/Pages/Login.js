import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("API URL:", apiUrl);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;

        // Store the JWT token (e.g., in localStorage or context)
        localStorage.setItem("token", token);

        // Optionally, you can fetch user details to get the user type
        const userResponse = await axios.get(
          "http://localhost:3001/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { userType } = userResponse.data;
        
        // Redirect based on user type
        if (userType === "NORMAL_USER") {
          navigate("/userhomepage");
        } else if (userType === "PROGRAMMER") {
          navigate("/prohomepage");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-container">
      {/* <img src={logo} alt="Website Logo" className="login-logo" /> */}
      <h1 className="login-letter">Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-submit-button">
          Login
        </button>
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
