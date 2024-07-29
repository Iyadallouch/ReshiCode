import React from 'react'
import "../Feedback/Feedback.css";

export default function Feedback() {
    return (
        <div className="feedback-card">
          <p className="feedback-paragraph">
            This is an example of feedback text.
          </p>
          <hr />
          <div className="feedback-author">
            <span>Written by user</span>
            <span className="feedback-date">January 1, 2023</span>
          </div>
        </div>
      );
    };