import React from "react";
import logo from "../images/logo.png";
import userImage from "../images/userpic.png";
import "../style/ProHomepage.css";

import { FaStar } from "react-icons/fa";

export default function ProHomepage() {
  return (
    <div className="pro-homepage-container">
      <div className="ProLeft-side">
        <div className="logo-welcome-container">
          <img src={logo} alt="Website Logo" className="website-logo" />
          <h1 className="welcome-text">Welcome to RESHI CODE website!</h1>
        </div>
        <div className="gray-card">
          {/* Content for the big gray card will go here */}
        </div>
      </div>
      <div className="ProRight-side">
        <img src={userImage} alt="User Logo" className="user-logo" />
        <h2>Dr. Yazeed</h2>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => (
            <FaStar key={index} className="star-icon" />
          ))}
        </div>
        <button className="profile-button">Profile</button>
      </div>
    </div>
  );
}
