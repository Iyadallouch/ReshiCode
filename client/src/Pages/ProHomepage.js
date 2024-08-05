import React from "react";
// import logo from "../images/logo.png";
import userImage from "../images/userpic.png";
import "../style/ProHomepage.css";
import ProArea from "../components/ProArea/ProArea";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

export default function ProHomepage() {
  return (
    <div className="proHome-homepage-container">
      <div className="proHome-top-section">
        <div className="proHome-logo-welcome-container">
          {/* <img src={logo} alt="Website Logo" className="proHome-website-logo" /> */}
          <h1 className="proHome-welcome-text">
            Welcome to RESHI CODE website!
          </h1>
        </div>
      </div>
      <div className="proHome-main-content">
        <div className="proHome-left-section">
          <div className="proHome-search-bar-container">
            <input
              type="text"
              placeholder="Search..."
              className="proHome-search-input"
            />
            <button className="proHome-search-button">Search</button>
          </div>
          <div className="proHome-gray-card">
            {/* Content for the big gray card will go here */}
            <ProArea />
            <ProArea />
          </div>
        </div>
        <div className="proHome-right-section">
          <img src={userImage} alt="User Logo" className="proHome-user-logo" />
          <h2 className="proHome-h2">Dr. Yazeed</h2>
          <div className="proHome-star-rating">
            Rate
            {[...Array(5)].map((star, index) => (
              <FaStar key={index} className="proHome-star-icon" />
            ))}
          </div>
          <Link to="/proprofile" className="notLink">
            <button className="proHome-profile-button">Go to Profile</button>
          </Link>
          <button className="proHome-profile-button">Log out</button>
        </div>
      </div>
    </div>
  );
}
