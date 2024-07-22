import React from "react";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import "../ProRequest/ProRequest.css";
import userImage from "../../images/userpic.png";




export default function ProRequest({ user }) {
  return (
    <div className="req-pro-request-card">
      <div className="req-user-info">
        <img src={userImage} alt="User" />
        <span className="req-user-name">Iyad Allouch</span>
        <FaCheck className="req-icon req-accept-icon" />
        <FaTimes className="req-icon req-reject-icon" />
      </div>
      <div className="req-rating-feedback">
        <div className="req-stars">
          <FaStar className="req-star" />
          <FaStar className="req-star" />
          <FaStar className="req-star" />
          <FaStar className="req-star" />
          <FaStar className="req-star" />
        </div>
        <button className="req-feedback-button">Feedback</button>
      </div>
    </div>
  );
}
