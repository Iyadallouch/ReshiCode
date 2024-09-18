import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import axios from "axios";
import "../style/SignupPage.css";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const UserOption = [
    { value: "NORMAL_USER", label: "User" },
    { value: "PROGRAMMER", label: "Programmer" },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please select a user type before submitting.");
      return;
    }

    const signupData = {
      ...formData,
      phoneNumber: phone,
      type: user ? user.value :"", // Ensure user role (normal or programmer) is included
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        signupData
      );
      if (response.status === 201) {
        // On success, redirect to login page
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-h1">Signup</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-row">
          <div className="signup-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="signup-form-row">
          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="phone">Phone Number</label>
            <PhoneInput
              country={"ae"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputProps={{
                name: "phone",
                required: true,
              }}
            />
          </div>
        </div>
        <div className="signup-form-row">
          <div className="signup-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="signup-form-group">
          <label htmlFor="user">Create account as</label>
          <Select
            options={UserOption}
            value={user}
            onChange={setUser}
            placeholder="Select Who you are"
            id="user"
            name="user"
          />
        </div>
        <button type="submit" className="signup-submit-button">
          Sign Up
        </button>
        <p className="signup-p">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login
          </Link>
          now
        </p>
      </form>
    </div>
  );
}
