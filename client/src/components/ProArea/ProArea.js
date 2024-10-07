import React from "react";
import "../ProArea/ProArea.css";

export default function ProArea({
  areaName,
  owner,
  numOfUsers,
  areaId,
  language,
  onJoinRoom,
}) {
  return (
    <div>
      <div className="pro-card">
        <div className="pro-info">
          <div className="pro-info-pair">
            <span className="pro-label">Name</span>
            <span className="pro-value">{areaName}</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">Owner name</span>
            <span className="pro-value">{owner}</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">ID:</span>
            <span className="pro-value">{areaId}</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">Members:</span>
            <span className="pro-value">{numOfUsers}</span>
          </div>
          <div className="pro-info-pair">
            <span className="pro-label">language:</span>
            <span className="pro-value">{language}</span>
          </div>
        </div>
        <button className="pro-button" onClick={onJoinRoom}>
          Join
        </button>
      </div>
    </div>
  );
}
