import React from "react";
import "../ProArea/ProArea.css";

export default function ProArea() {
  return (
    <div>
      <div className="pro-card">
        <div className="pro-info">
          <div className="info-pair">
            <span className="label">Name</span>
            <span className="value">java Help</span>
          </div>
          <div className="info-pair">
            <span className="label">Username</span>
            <span className="value">Iyad</span>
          </div>
          <div className="info-pair">
            <span className="label">ID:</span>
            <span className="value">43234234</span>
          </div>
          <div className="info-pair">
            <span className="label">Members:</span>
            <span className="value">4</span>
          </div>
        </div>
        <button className="pro-button">Join</button>
      </div>
    </div>
  );
}
