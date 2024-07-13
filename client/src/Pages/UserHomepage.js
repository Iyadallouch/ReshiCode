import React, { useState, useRef } from "react";
import Select from "react-select";
import logo from "../images/logo.png";
import userImage from "../images/userpic.png";
import "../style/UserHomepage.css";

const languageOptions = [
  { value: "cPlus", label: "C+" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

export default function UserHomepage() {
  const [areaName, setAreaName] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isSelectFocused, setSelectFocused] = useState(false);
  const selectRef = useRef(null); // Create a ref for the select input

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
    // Blur the select input after selection
    if (selectRef.current) {
      selectRef.current.blur();
      setSelectFocused(false); // Reset focus state
    }
  };

  return (
    <div>
      <div className="user-homepage-container">
        <div className="header">
          <img className="logo" alt="logo" src={logo} />
          <div className="website-info">
            <h1 className="website-name">Welcome to Reshi Code website !!</h1>
            <p className="website-description">
              Experience Real-Time Collaboration with Expert Programmers
              <br />
              Instantly Resolve Code Errors and Enhance Your Projects with Live
              Assistance
            </p>
          </div>
          <div className="user-info">
            <img className="user-image" alt="user" src={userImage} />
            <p className="user-name">User Name</p>
            <button className="profile-button">Go to Profile</button>
            <button className="profile-button">Log out</button>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="left-side">
          <form className="programming-area-form">
            <label htmlFor="area-name">Enter programming area name:</label>
            <input
              type="text"
              id="area-name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="programming area name"
            />

            <p>Choose programming languages:</p>
            <Select
              ref={selectRef} // Attach the ref to the Select component
              options={languageOptions}
              className="react-select"
              classNamePrefix="react-select"
              onChange={handleLanguageChange}
              placeholder="Select languages..."
              onFocus={() => setSelectFocused(true)}
              onBlur={() => setSelectFocused(false)}
            />

            <button
              type="button"
              className={`create-button ${isSelectFocused ? "active" : ""}`}
            >
              Create programming area
            </button>
          </form>
        </div>
        <div className="right-side">{/* Right side content goes here */}</div>
      </div>
    </div>
  );
}
