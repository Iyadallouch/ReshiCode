import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "../ProRequest/ProRequest.css";
import userImage from "../../images/userpic.png";
import StarRating from "../Stars/StarRating";

export default function ProRequest({ user, rate, onAccept, image, onReject }) {
  return (
    <div className="req-pro-request-card">
      <div className="req-user-info">
        <img
          src={image ? `data:image/jpeg;base64,${image}` : userImage}
          alt="User"
        />
        <span className="req-user-name">{user}</span>
        <FaCheck className="req-icon req-accept-icon" onClick={onAccept} />
        <FaTimes className="req-icon req-reject-icon" onClick={onReject} />
      </div>
      <div className="req-rating-feedback">
        <StarRating rating={rate} />
      </div>
    </div>
  );
}
