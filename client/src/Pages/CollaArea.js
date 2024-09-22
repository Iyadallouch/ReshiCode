import React, { useState, useEffect } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// Initialize the socket connection
const socket = io.connect("http://192.168.1.39:3001");

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(""); // Room state for managing room joining
  const [userList, setUserList] = useState([]); // To track users in the room
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  useEffect(() => {
    // Fetch JWT from localStorage and authenticate
    const token = localStorage.getItem("token"); // Assuming token is stored here
    if (token) {
      socket.emit("auth", token); // Send token to the server for authentication
    }
    socket.on("userInfo", ({ username }) => {
      socket.username = username; // Set the username after successful auth
      console.log("Authenticated user:", socket.username);
    });
    // Listen for user list from the server
    socket.on("user_list", (users) => {
      setUserList(users); // Update user list
    });

    // Listen for new messages from the server
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Add new messages
    });

    // Listen for old messages when joining a room
    socket.on("get_old_messages", (oldMessages) => {
      setMessages((prevMessages) => [...prevMessages, ...oldMessages]); // Add old messages
    });

    // Clean up on component unmount
    return () => {
      socket.off("user_list");
      socket.off("receive_message");
      socket.off("get_old_messages");
    };
  }, []);
  // Function to join a room
  const joinRoom = (e) => {
    e.preventDefault();
    if (room.trim()) {
      socket.emit("join_room", room); // Emit join room event to the server
    }
  };
  // Function to send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        id: Date.now(),
        username: socket.username, // Include username in the message data
        message,
        room,
      };
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
        </div>
        <div className="code-mirror">
          <CodeMirror
            value={value}
            height="100%"
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            style={{
              minWidth: "100%",
            }}
          />
        </div>
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
              <div className="colla-user-card">
                <img src={userImage} alt="User" />
                <h2>Connected Users:</h2>
                <ul>
                  {userList.map((username, index) => (
                    <li key={index}>{username}</li>
                  ))}
                </ul>
              </div>
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
            <div key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </div>
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
