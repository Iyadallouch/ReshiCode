import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../style/LoginPage.css";
import { login } from "../loginSlice";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Store the JWT token
        console.log(token);

        // Decode the token to extract the username and userType
        const decodedToken = jwtDecode(token);
        const { username, userType } = decodedToken; // Assuming these fields exist in the token payload
        dispatch(
          login({
            username: username,
            userType: userType,
            token: token,
            userImage: response.data.imageData,
          })
        );

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
