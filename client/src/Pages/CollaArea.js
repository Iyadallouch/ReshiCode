import React, { useState } from "react";
import "../style/CollaAreaPage.css";
import userImage from "../images/userpic.png";
import ProRequest from "../components/ProRequest/ProRequest";
import { Link } from "react-router-dom";

export default function CollaArea() {
  const [activeTab, setActiveTab] = useState("members");

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
              className={`colla-tab ${activeTab === "requests" ? "active" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </button>
          </div>
          <div className="colla-tab-content">
            {activeTab === "members" ? (
              <>
                <div className="colla-user-card">
                  <img src={userImage} alt="User 1" />
                  <h2>Dr. Yazeed Ghadi</h2>
                </div>
                <div className="colla-user-card">
                  <img src={userImage} alt="User 2" />
                  <h2>Iyad Allouch</h2>
                </div>
                <div className="colla-user-card">
                  <img src={userImage} alt="User 3" />
                  <h2>Dina test</h2>
                </div>
                <div className="colla-user-card">
                  <img src={userImage} alt="User 4" />
                  <h2>User four</h2>
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
        <div className="colla-output-label">Chatting area :</div>
        <div className="colla-empty-card">
          <p>This is an empty card...</p>
        </div>
      </div>
    </div>
  );
}
