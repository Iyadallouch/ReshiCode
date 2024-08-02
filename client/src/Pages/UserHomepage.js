import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import userImage from "../images/userpic.png";
import "../style/UserHomepage.css";

export default function UserHomepage() {
  const [areaName, setAreaName] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isSelectFocused, setSelectFocused] = useState(false);
  const selectRef = useRef(null);

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions.target.value);
    if (selectRef.current) {
      selectRef.current.blur();
      setSelectFocused(false);
    }
  };

  return (
    <div>
      <div className="userhome-user-homepage-container">
        <div className="userhome-header">
          <img className="userhome-logo" alt="logo" src={logo} />
          <div className="userhome-website-info">
            <h1 className="userhome-website-name">
              Welcome to Reshi Code website !!
            </h1>
            <p className="userhome-website-description">
              Experience Real-Time Collaboration with Expert Programmers
              <br />
              Instantly Resolve Code Errors and Enhance Your Projects with Live
              Assistance
            </p>
          </div>
          <div className="userhome-user-info">
            <img className="userhome-user-image" alt="user" src={userImage} />
            <p className="userhome-user-name">User Name</p>
            <Link to="/userprofile" className="userhome-notLink">
              <button className="userhome-profile-button">Go to Profile</button>
            </Link>
            <button className="userhome-profile-button">Log out</button>
          </div>
        </div>
      </div>
      <div className="userhome-content-container">
        <div className="userhome-left-side">
          <form className="userhome-programming-area-form">
            <label htmlFor="area-name" className="userhome-label">Enter programming area name:</label>
            <input
              type="text"
              id="area-name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="programming area name"
            />

            <p>Choose programming languages:</p>
            <select
              value={selectedLanguages}
              onChange={handleLanguageChange}
              onFocus={() => setSelectFocused(true)}
              onBlur={() => setSelectFocused(false)}
              ref={selectRef}
              placeholder="Select languages..."
            >
              <option value="" disabled>
                Select languages...
              </option>
              <option value="cPlus">C+</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <Link to="/collaarea" className="userhome-notLink">
              <button
                type="button"
                className={`userhome-create-button ${
                  isSelectFocused ? "active" : ""
                }`}
              >
                Create programming area
              </button>
            </Link>
          </form>
        </div>
        <div className="userhome-right-side">
          <p className="userhome-right-side-text">
            Ask for help from our chatbot AI
          </p>
          <button className="userhome-right-side-button">chatbot</button>
        </div>
      </div>
    </div>
  );
}
