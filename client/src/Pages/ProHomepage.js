import React, { useEffect, useState } from "react";
import Image from "../images/userpic.png";
import "../style/ProHomepage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you are using axios
import socket from "../components/socket";
import ProArea from "../components/ProArea/ProArea";
import { useSelector } from "react-redux";

export default function ProHomepage() {
  const [rooms, setRooms] = useState([]); // To store the rooms fetched from backend
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const username = useSelector((state) => state.login.username);
  const userImage = useSelector((state) => state.login.userImage);
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
    const { roomName, roomId: areaId, language } = room; // Destructure areaName and areaId

    if (roomName.trim()) {
      if (!socket.connected) {
        socket.connect();
      }

      if (token) {
        socket.emit("auth", token); // Send token to the server for authentication
      }

      socket.once("userInfo", ({ username }) => {
        socket.username = username; // Set the username after successful auth
        console.log("Authenticated user:", socket.username);

        // Emit the join_room event with areaName and areaId

        socket.emit("join_room", { areaName: roomName, areaId, language }); // Emit both areaName and areaId

        // Navigate to CollaArea with areaName and areaId passed as state
        navigate("/collaarea", {
          state: {
            room: roomName,
            areaId: areaId,
            language: language,
            prog: true,
          },
        });
      });
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update search term in lowercase
  };

  // Filter rooms based on search term
  const filteredRooms = rooms.filter((room) => {
    return (
      room.roomName.toLowerCase().includes(searchTerm) ||
      room.roomId.toLowerCase().includes(searchTerm) ||
      room.language.toLowerCase().includes(searchTerm)
    );
  });

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
              placeholder="Search by Room ID, Name, or Language..."
              className="proHome-search-input"
              value={searchTerm} // Bind input value to searchTerm
              onChange={handleSearchChange} // Handle input changes
            />
            <button className="proHome-search-button">Search</button>
          </div>
          <div className="proHome-gray-card">
            <h2 className="proHome-Avaroom-text">Available Rooms :</h2>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <ProArea
                  key={room.roomId}
                  areaName={room.roomName}
                  owner={room.owner}
                  language={room.language}
                  areaId={room.roomId}
                  numOfUsers={room.users}
                  onJoinRoom={() => handleJoinRoom(room)} // Pass the room to the handler
                />
              ))
            ) : (
              <p className="proHome-h2">No rooms available</p>
            )}
          </div>
        </div>
        <div className="proHome-right-section">
          <img
            src={userImage ? `data:image/jpeg;base64,${userImage}` : Image}
            alt="User Logo"
            className="proHome-user-logo"
          />
          <h2 className="proHome-h2">{username}</h2>

          <Link to="/proprofile" className="notLink">
            <button className="proHome-profile-button">Go to Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
