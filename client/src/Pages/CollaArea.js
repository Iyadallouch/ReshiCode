import React, { useState } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="colla-area-container">
      <div className="colla-left-side">
        <div className="buttons-container">
          <span className="buttons-text">Enter your code :</span>
          <button className="colla-action-button">Run</button>
          <button className="colla-action-button">Save</button>
        </div>
        <textarea
          className="code-input"
          placeholder="Enter your code here..."
        ></textarea>
        <div className="output-label">Output :</div>
        <div className="output-card">
          <p>Your output will be displayed here...</p>
        </div>
      </div>
      <div className="colla-right-side">
        <button className="top-button">End Session</button>
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "members" ? "active" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
            <button
              className={`tab ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "members" ? (
              <>
                <div className="user-card">
                  <img src={userImage} alt="User 1" />
                  <h2>Dr. Yazeed Ghadi</h2>
                </div>
                <div className="user-card">
                  <img src={userImage} alt="User 2" />
                  <h2>Iyad Allouch</h2>
                </div>
                <div className="user-card">
                  <img src={userImage} alt="User 3" />
                  <h2>Dina test</h2>
                </div>
                <div className="user-card">
                  <img src={userImage} alt="User 4" />
                  <h2>User four</h2>
                </div>
              </>
            ) : (
              <div className="request-card">
                <ProRequest userName="User 1" />
                <ProRequest userName="User 2" />
                <ProRequest userName="User 3" />
              </div>
            )}
          </div>
        </div>
        <div className="output-label">Chatting area :</div>
        <div className="empty-card">
          <p>This is an empty card...</p>
        </div>
      </div>
    </div>
  );
}
