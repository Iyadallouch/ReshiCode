import React, { useState, useEffect } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import socket from "../components/socket";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [output, setOutput] = useState("");
  const [code, setcode] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const location = useLocation();
  const room = location.state?.room;
  const language = location.state?.language;
  const uniqueMessages = [];
  const seenIds = new Set();
  messages.forEach((msg) => {
    if (!seenIds.has(msg.id)) {
      seenIds.add(msg.id);
      uniqueMessages.push(msg);
    }
  });
  useEffect(() => {
    if (room) {
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit("join_room", room);
      console.log("connected");
    }

    const handleUserList = (users) => {
      setUserList(users);
    };

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleGetOldMessages = (oldMessages) => {
      setMessages((prevMessages) => [...prevMessages, ...oldMessages]);
    };

    const handleCodeUpdate = (newCode) => {
      setcode(newCode);
    };

    const handleGetOldCode = (oldCode) => {
      setcode(oldCode);
    };
    const handleRoomClosed = (message) => {
      navigate("/prohomepage"); // Redirect the user to the homepage or another page
      alert(message); // Display a message to the user
      socket.disconnect(); // Optionally disconnect the socket
    };
    socket.on("user_list", handleUserList);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("get_old_messages", handleGetOldMessages);
    socket.on("code_update", handleCodeUpdate);
    socket.on("get_old_code", handleGetOldCode);
    socket.on("room_closed", handleRoomClosed);

    return () => {
      socket.off("user_list", handleUserList);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("get_old_messages", handleGetOldMessages);
      socket.off("code_update", handleCodeUpdate);
      socket.off("get_old_code", handleGetOldCode);
      socket.on("room_closed", handleRoomClosed);
    };
  }, [room, navigate]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        id: Date.now(),
        username: socket.username,
        message,
        room,
      };
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  const onChange = (val) => {
    setcode(val);
    socket.emit("code_change", val);
  };
  const handleSave = async () => {
    const userId = socket.userId; // Assuming you have userId stored in the socket
    const roomId = room; // Use the room ID from location state
    console.log(roomId);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/saveCode",
        {
          // Update with your actual endpoint
          roomId,
          userId,
          code: code,
        }
      );

      console.log("Code saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving code:", console.log(roomId, userId));
    }
  };

  // Function to handle end session click
  const handleEndSessionClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmEndSession = () => {
    socket.disconnect(); // Disconnect the socket
    setShowModal(false); // Hide the modal
    navigate("/evaluations");
    // Optionally, redirect or perform any additional cleanup here
  };
  const handleRun = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/code/run", {
        language, // selected programming language
        code: code, // Escaping double quotes
      });
      setOutput(response.data.output); // Set the output from the response
    } catch (error) {
      setOutput(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };
  return (
    <div className="colla-area-container">
      <div className="colla-left-side">
        <div className="colla-buttons-container">
          <span className="colla-buttons-text">Enter your code :</span>
          <button className="colla-action-button" onClick={handleRun}>
            Run
          </button>
          <button className="colla-action-button" onClick={handleSave}>
            Save
          </button>
        </div>
        <div className="code-mirror">
          <CodeMirror
            value={code}
            height="100%"
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            style={{ minWidth: "100%" }}
          />
        </div>
        <div className="colla-output-label">Output :</div>
        <div className="colla-output-card">
          <pre>{output}</pre>
        </div>
      </div>

      <div className="colla-right-side">
        <div className="colla-top-button-container">
          <button className="colla-top-button" onClick={handleEndSessionClick}>
            End Session
          </button>
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

        <div className="colla-output-label">Chatting area :</div>
        <div className="colla-empty-card">
          {uniqueMessages.map((msg, index) => (
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

      {/* Bootstrap Modal for confirmation */}
      <Alert
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmEndSession}
      />
    </div>
  );
}
