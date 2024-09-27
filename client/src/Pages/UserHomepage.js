import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../images/userpic.png";
import "../style/UserHomepage.css";
import socket from "../components/socket";
// Initialize the socket connection

export default function UserHomepage() {
  const [areaName, setAreaName] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState("");
  const [isSelectFocused, setSelectFocused] = useState(false);
  const navigate = useNavigate();
  const selectRef = useRef(null);

  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions.target.value);
    if (selectRef.current) {
      selectRef.current.blur();
      setSelectFocused(false);
    }
  };

  const handleCreateArea = () => {
    if (areaName.trim()&&selectedLanguages) {
      if (!socket.connected) {
        socket.connect();
      }
      const token = localStorage.getItem("token"); // Assuming token is stored here
      if (token) {
        socket.emit("auth", token); // Send token to the server for authentication
      }
      socket.once("userInfo", ({ username }) => {
        socket.username = username; // Set the username after successful auth
        console.log("Authenticated user:", socket.username);

        // Emit the join_room event when creating the area
        socket.emit("join_room", areaName);

        // Navigate to CollaArea with areaName (room ID) passed as state
        navigate("/collaarea", { state: { room: areaName, language:selectedLanguages } });
      });
    }
  };

  return (
    <div>
      <div className="userhome-user-homepage-container">
        <div className="userhome-header">
          <div className="userhome-website-info">
            <h1 className="userhome-website-name">
              Welcome to Reshi Code website !!
            </h1>
            <p className="userhome-website-description">
              Experience Real-Time Collaboration with Expert Programmers
              Instantly Resolve Code Errors and Enhance Your Projects with Live
              Assistance
            </p>
          </div>
          <div className="userhome-user-info">
            <img className="userhome-user-image" alt="user" src={userImage} />
            <p className="userhome-user-name">User Name</p>
            <button className="userhome-profile-button">Log out</button>
          </div>
        </div>
      </div>
      <div className="userhome-content-container">
        <div className="userhome-left-side">
          <form className="userhome-programming-area-form">
            <label htmlFor="area-name" className="userhome-label">
              Enter programming area name:
            </label>
            <input
              type="text"
              id="area-name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Programming area name"
            />

            <p>Choose programming languages:</p>
           <select
  value={selectedLanguages}
  onChange={handleLanguageChange}
  onFocus={() => setSelectFocused(true)}
  onBlur={() => setSelectFocused(false)}
  ref={selectRef}
>
  <option value="" disabled>Select languages...</option>
  <option value="cpp">C++</option>
  <option value="java">Java</option>
  <option value="python">Python</option>
  <option value="javascript">JavaScript</option>
</select>

            <button
              type="button"
              className={`userhome-create-button ${
                isSelectFocused ? "active" : ""
              }`}
              onClick={handleCreateArea} // Trigger area creation
            >
              Create programming area
            </button>
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
