import React from "react";
import logo from "../images/logo.png";
import userImage from "../images/userpic.png";
import "../style/ProHomepage.css";
import ProArea from "../components/ProArea/ProArea";

import { FaStar } from "react-icons/fa";

export default function ProHomepage() {
  return (
    <div className="pro-homepage-container">
      <div className="top-section">
        <div className="logo-welcome-container">
          <img src={logo} alt="Website Logo" className="website-logo" />
          <h1 className="welcome-text">Welcome to RESHI CODE website!</h1>
        </div>
      </div>
      <div className="main-content">
        <div className="left-section">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
          <div className="gray-card">
            {/* Content for the big gray card will go here */}
            <ProArea />
            <ProArea />
          </div>
        </div>
        <div className="right-section">
          <img src={userImage} alt="User Logo" className="user-logo" />
          <h2>Dr. Yazeed</h2>
          <div className="star-rating">
            Rate :
            {[...Array(5)].map((star, index) => (
              <FaStar key={index} className="star-icon" />
            ))}
          </div>
          <button className="profile-button">Profile</button>
          <button className="profile-button">Logout</button>
        </div>
      </div>
    </div>
  );
}
