import React, { useEffect, useState } from "react";
import userImage from "../images/userpic.png";
import "../style/ProHomepage.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios"; // Assuming you are using axios
import socket from "../components/socket";
export default function ProHomepage() {
  const [rooms, setRooms] = useState([]); // To store the rooms fetched from backend
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of rooms when the component mounts
    axios
      .get("http://localhost:3001/api/rooms")
      .then((response) => {
        setRooms(response.data); // Store the rooms in state
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  // Function to handle room click and navigate to CollaArea
  const handleJoinRoom = (room) => {
    if (room.trim()) {
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

        // Emit the join_room event after authentication is complete
        socket.emit("join_room", room);

        // Navigate to CollaArea with areaName (room ID) passed as state
        navigate("/collaarea", { state: { room: room } });
      });
    }
  };

  return (
    <div className="proHome-homepage-container">
      <div className="proHome-top-section">
        <div className="proHome-logo-welcome-container">
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
            <h2>Available Rooms:</h2>
            <ul>
              {rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <li key={index} onClick={() => handleJoinRoom(room)}>
                    {room}
                  </li>
                ))
              ) : (
                <p>No rooms available</p>
              )}
            </ul>
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
