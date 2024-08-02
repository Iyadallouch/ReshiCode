import React from "react";
import "../ProArea/ProArea.css";

export default function ProArea() {
  return (
    <div>
      <div className="pro-card">
        <div className="pro-info">
          <div className="pro-info-pair">
            <span className="pro-label">Name</span>
            <span className="pro-value">java Help</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">Username</span>
            <span className="pro-value">Iyad</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">ID:</span>
            <span className="pro-value">43234234</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">Members:</span>
            <span className="pro-value">4</span>
          </div>
        </div>
        <button className="pro-button">Join</button>
      </div>
    </div>
  );
}
