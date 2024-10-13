import React, { useState, useEffect } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import socket from "../components/socket";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";
import logo from "../images/logo.png";
import { ReactTyped } from "react-typed";
import Modal from "../components/AlertColla/Modal";
import { useSelector } from "react-redux";

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pendingProgrammer, setPendingProgrammer] = useState([]);
  const [output, setOutput] = useState("");
  const [progStatus, setProgStatus] = useState();
  const [code, setcode] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const location = useLocation();
  const [userImages, setUserImages] = useState([]);
  const { areaId, room, language, prog } = location.state || {};
  const uniqueMessages = [];
  const seenIds = new Set();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const userType = useSelector((state) => state.login.userType);
  console.log(userType);
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
      // Emitting with room details
      socket.emit("join_room", {
        areaName: room,
        areaId: areaId, // Make sure to define roomId if necessary
      });

      console.log("connected");
    }

    const handleUserList = async (users) => {
      try {
        // Set userList state with the usernames first
        setUserList(users);
        console.log(users);
        // Make API call to fetch images for the user list as a GET request with query parameters
        const response = await axios.post(
          "http://localhost:3001/api/auth/getUserImages",
          {
            users,
          }
        );

        // Assuming the API response contains an array of { username, image } objects
        setUserImages(response.data);
        console.log("images", userImages);
        // Set the updated user list with images
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };

    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleGetOldMessages = (oldMessages) => {
      console.log("old messages", oldMessages);
      setMessages((prevMessages) => [...prevMessages, ...oldMessages]);
    };

    const handleCodeUpdate = (newCode) => {
      setcode(newCode);
    };

    const handleGetOldCode = (oldCode) => {
      setcode(oldCode);
    };

    const handleRoomClosed = (message) => {
      setModalMessage(message); // Set the message to display in the modal
      setIsModalOpen(true); // Open the modal
      socket.disconnect(); // Optionally disconnect the socket
      setTimeout(() => {
        window.location.href = "/prohomepage"; // Redirect after showing the modal
      }, 2000); // Optional delay before redirecting
    };
    const handlePendingUsers = async (pending) => {
      console.log("Pending users", pending);

      try {
        const response = await axios.post(
          "http://localhost:3001/api/auth/proInfoPending",
          {
            usernames: pending,
          }
        );
        const programmersData = response.data;
        setPendingProgrammer(programmersData);
        // You can set this data to state or use it as needed
      } catch (error) {
        console.error("Failed to fetch programmer info", error);
      }
    };

    socket.on("join_request_status", (data) => {
      if (data.message === "Accepted") {
        setProgStatus(true);
        setModalMessage(data.message);
        setIsModalOpen(true);
      } else if (data.message === "Rejected") {
        setProgStatus(false);
        setModalMessage(data.message);
        setIsModalOpen(true);
        setTimeout(() => {
          window.location.href = "/prohomepage"; // Redirect after showing the modal
        }, 2000); // Optional delay before redirecting
      }
    });

    socket.on("user_list", handleUserList);
    socket.on("pending_list", handlePendingUsers);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("get_old_messages", handleGetOldMessages);
    socket.on("code_update", handleCodeUpdate);
    socket.on("get_old_code", handleGetOldCode);
    socket.on("room_closed", handleRoomClosed);
    return () => {
      socket.off("pending_list", handlePendingUsers);
      socket.off("user_list", handleUserList);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("get_old_messages", handleGetOldMessages);
      socket.off("code_update", handleCodeUpdate);
      socket.off("get_old_code", handleGetOldCode);
      socket.on("room_closed", handleRoomClosed);
    };
  }, [areaId, room, navigate]);
  const handleDisconnectProgrammer = () => {
    console.log(socket.username, areaId);
    // Emit the disconnect_user event to the server
    socket.emit("disconnect_programmer", { areaId });
    window.location.href = "/prohomepage";
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        id: Date.now(),
        username: socket.username,
        message,
        room: areaId,
      };
      console.log(msgData);
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  const onChange = (val) => {
    setcode(val);
    socket.emit("code_change", val);
  };
  const handleSave = async () => {
    const userName = socket.username; // Assuming you have userId stored in the socket

    const roomId = areaId; // Use the room ID from location state
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/saveCode",
        {
          // Update with your actual endpoint
          roomId,
          room,
          language,
          userName,
          code: code,
        }
      );

      console.log("Code saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving code:", console.log(roomId, userName));
    }
  };

  // Function to handle end session click
  const handleEndSessionClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const confirmEndSession = () => {
    socket.disconnect(); // Disconnect the socket
    setShowModal(false); // Hide the modal
    const updatedList = userList.filter((user) => {
      console.log(
        "Type of user:",
        typeof user,
        "Type of socket.username:",
        typeof socket.username
      );
      return user !== socket.username;
    });

    console.log("Updated List after filtering:", updatedList);
    if (userType === "NORMAL_USER") {
      navigate("/evaluations", { state: { updatedList } }); // Optionally, redirect or perform any additional cleanup here
    } else {
      window.location.href = "/prohomepage"; // Redirect after showing the modal
    }
  };
  const handleRun = async (e) => {
    e.preventDefault();

    // Check if the socket is still connected before running the code
    if (!socket.connected) {
      console.error("Socket is not connected!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/code/run", {
        language, // selected programming language
        code: language === "javascript" ? code.replace(/"/g, '\\"') : code, // the current code to run
      });
      setOutput(response.data.output); // Set the output from the response
    } catch (error) {
      setOutput(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };
  const handleAccept = (username, areaId) => {
    console.log("areaId", areaId, "username", username);
    // Logic to handle accepting the request
    socket.emit("accept_user", { username, areaId }); // Send as an object
  };

  const handleReject = (username) => {
    // Logic to handle rejecting the request
    socket.emit("reject_user", { areaId, username });
    // Emit socket event or API call here
  };
  const getLanguageExtension = () => {
    console.log(language);
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      default:
        return javascript(); // Default to JavaScript if no match
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {prog && !progStatus ? (
        <div className="colla-body">
          <div className="colla-logo">
            <img className="colla-img" src={logo} alt="logo" />
          </div>
          <div className="colla-container">
            <h5>
              Waiting for user accept{" "}
              <ReactTyped strings={["..."]} typeSpeed={100} loop />
            </h5>
            <button
              className="colla-top-button"
              onClick={handleDisconnectProgrammer}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : !prog || progStatus ? (
        <div className="colla-area-container">
          <div className="colla-left-side">
            <div className="colla-buttons-container">
              <span className="colla-buttons-text">Enter your code :</span>
              <button className="colla-action-button" onClick={handleRun}>
                Run
              </button>
              {userType === "NORMAL_USER" && (
                <button className="colla-action-button" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
            <div className="code-mirror">
              <CodeMirror
                value={code}
                height="100%"
                theme={vscodeDark}
                extensions={[getLanguageExtension()]}
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
              <button
                className="colla-top-button"
                onClick={handleEndSessionClick}
              >
                {userType === "NORMAL_USER" ? "End session" : "Leave session"}
              </button>
            </div>
            <div className="colla-tabs-container">
              <div className="colla-tabs">
                <button
                  className={`colla-tab ${
                    activeTab === "members" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("members")}
                >
                  Members
                </button>
                {userType === "NORMAL_USER" && (
                  <button
                    className={`colla-tab ${
                      activeTab === "requests" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("requests")}
                  >
                    Requests
                  </button>
                )}
              </div>

              <div className="colla-tab-content">
                {activeTab === "members" ? (
                  <div>
                    {userList.map((username, index) => (
                      <div className="colla-user-card">
                        <img
                          src={
                            userImages[index]?.image
                              ? `data:image/jpeg;base64,${userImages[index].image}`
                              : userImage
                          }
                          alt="User"
                        />
                        <h2 key={index}>{username}</h2>
                        <ul></ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="colla-request-card">
                    {pendingProgrammer.length > 0 ? (
                      pendingProgrammer.map((programmer, index) => (
                        <ProRequest
                          key={programmer.id || index} // Use a unique identifier if available
                          user={programmer.username}
                          rate={programmer.rate} // Assuming `rating` is fetched from API response
                          image={programmer.image}
                          onAccept={() =>
                            handleAccept(programmer.username, areaId)
                          }
                          onReject={() => handleReject(programmer.username)}
                        />
                      ))
                    ) : (
                      <p>No pending requests.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Chatting area */}
            <div className="colla-output-label">Chatting area :</div>
            <div className="colla-empty-card">
              {uniqueMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`colla-message-card ${
                    msg.username === socket.username ? "self" : ""
                  }`}
                >
                  <div className="colla-message-sender">{msg.username}</div>
                  <div className="colla-message-text">{msg.message}</div>
                </div>
              ))}
            </div>

            <form
              className="colla-message-input-container"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                className="colla-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit" className="colla-message-send-button">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />

      {/* Bootstrap Modal for confirmation */}
      <Alert
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmEndSession}
      />
    </div>
  );
}
