import React, { useState, useEffect } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import { Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import socket from "../components/socket"; // Import the shared socket instance
import { useLocation } from "react-router-dom";

// Initialize the socket connection

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const room = location.state?.room; // Access the room (areaName) from state
  const [userList, setUserList] = useState([]); // To track users in the room
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  useEffect(() => {
    if (room) {
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit("join_room", room); // Automatically join the room on page load
    }

    socket.on("user_list", (users) => {
      setUserList(users);
    });

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("get_old_messages", (oldMessages) => {
      setMessages((prevMessages) => [...prevMessages, ...oldMessages]);
    });

    return () => {
      socket.off("user_list");
      socket.off("receive_message");
      socket.off("get_old_messages");
    };
  }, [room]);

  // Function to join a room

  // Function to send a message
  const sendMessage = (e) => {
    if (!room) {
      console.error("No room joined. Cannot send messages.");
      return;
    }
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
        <div className="colla-room-container"></div>

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
