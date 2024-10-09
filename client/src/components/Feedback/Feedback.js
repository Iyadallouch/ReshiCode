import React from "react";
import "../Feedback/Feedback.css";

export default function Feedback({ feedback, username, date }) {
  return (
    <div className="feedback-card">
      <p className="feedback-paragraph">{feedback}</p>
      <hr />
      <div className="feedback-author">
        <span>
          Written by <b className="feedback-author2">{username}</b>
        </span>
        <span className="feedback-date">{date}</span>
      </div>
    </div>
  );
}
