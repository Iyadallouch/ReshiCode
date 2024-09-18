import React, { useState, useEffect } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.39:3001");

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(""); // Room state for managing room joining
  const [userList, setUserList] = useState([]); // To track users in the room

  useEffect(() => {
    // Listen for messages from the server
    socket.on("send_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for the user list from the server
    socket.on("user_list", (users) => {
      setUserList(users);
    });

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("get_old_messages", (data) => {
      setMessages((prevMessages) => [...prevMessages, ...data]);
    });

    return () => {
      socket.off("send_message");
      socket.off("user_list");
    };
  }, []);

  // Function to join a room
  const joinRoom = (e) => {
    e.preventDefault();
    if (room.trim()) {
      socket.emit("join_room", room); // Emit the join_room event to the server
    }
  };

  // Function to send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = { id: Date.now(), message, room };
      socket.emit("send_message", msgData); // Send message to the server
      setMessage("");
    }
  };

  return (
    <div className="colla-area-container">
      <div className="colla-left-side">
        <div className="colla-buttons-container">
          <span className="colla-buttons-text">Enter your code :</span>
          <button className="colla-action-button">Run</button>
          <button className="colla-action-button">Save</button>
        </div>
        <textarea
          className="colla-code-input"
          placeholder="Enter your code here..."
        ></textarea>
        <div className="colla-output-label">Output :</div>
        <div className="colla-output-card">
          <p>Your output will be displayed here...</p>
        </div>
      </div>
      <div className="colla-right-side">
        <div className="colla-top-button-container">
          <Link to="/evaluations">
            <button className="colla-top-button">End Session</button>
          </Link>
        </div>
        <div className="colla-tabs-container">
          <div className="colla-tabs">
            <button
              className={`colla-tab ${activeTab === "members" ? "active" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
            <button
              className={`colla-tab ${
                activeTab === "requests" ? "active" : ""
              }`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </button>
          </div>
          <div className="colla-tab-content">
            {activeTab === "members" ? (
              <>
                <div className="colla-user-card">
                  <img src={userImage} alt="User" />
                  <h2>Connected Users:</h2>
                  <ul>
                    {userList.map((userId, index) => (
                      <li key={index}>{userId}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="colla-request-card">
                <ProRequest userName="User 1" />
                <ProRequest userName="User 2" />
                <ProRequest userName="User 3" />
              </div>
            )}
          </div>
        </div>

        {/* Room joining section */}
        <div className="colla-room-container">
          <form onSubmit={joinRoom}>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room ID"
            />
            <button type="submit">Join Room</button>
          </form>
        </div>

        <div className="colla-output-label">Chatting area :</div>
        <div className="colla-empty-card">
          {messages.map((msg, index) => (
            <div key={index}>{msg?.message}</div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
