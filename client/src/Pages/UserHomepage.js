import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../images/userpic.png";
import "../style/UserHomepage.css";
import socket from "../components/socket";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function
import { useSelector } from "react-redux";

// Initialize the socket connection

export default function UserHomepage() {
  const [areaName, setAreaName] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState("");
  const [isSelectFocused, setSelectFocused] = useState(false);
  const navigate = useNavigate();
  const selectRef = useRef(null);
  const token = useSelector((state) => state.login.token);
  const username = useSelector((state) => state.login.username);
  const userImage = useSelector((state) => state.login.userImage);
  const handleLanguageChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions.target.value);
    if (selectRef.current) {
      selectRef.current.blur();
      setSelectFocused(false);
    }
  };
  const handleCreateArea = () => {
    if (areaName.trim() && selectedLanguages) {
      const generatedRoomId = uuidv4();

      if (!socket.connected) {
        socket.connect();
      }

      if (token) {
        socket.emit("auth", token); // Send token to the server for authentication
      }

      socket.once("userInfo", ({ username }) => {
        socket.username = username; // Set the username after successful auth
        console.log("Authenticated user:", socket.username);

        // Emit the join_room event with both areaName and areaId
        socket.emit("join_room", {
          areaName: areaName, // Pass areaName
          areaId: generatedRoomId, // Pass generated room ID
          language: selectedLanguages,
        });

        // Navigate to CollaArea with areaName and areaId passed as state
        navigate("/collaarea", {
          state: {
            room: areaName,
            areaId: generatedRoomId,
            language: selectedLanguages,
          },
        });
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
            <img
              className="userhome-user-image"
              alt="user"
              src={userImage ? `data:image/jpeg;base64,${userImage}` : Image}
            />
            <p className="userhome-user-name">{username}</p>
            <Link to="/userprofile" className="notLink">
              <button className="userhome-profile-button">Go to profile</button>
            </Link>
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
              <option value="" disabled>
                Select languages...
              </option>
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
