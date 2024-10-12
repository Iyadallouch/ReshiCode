import React from "react";
import { FaCheck, FaTimes, FaStar } from "react-icons/fa";
import "../ProRequest/ProRequest.css";
import userImage from "../../images/userpic.png";

export default function ProRequest({ user, rate, onAccept, image, onReject }) {
  const totalStars = 5;

  // Round rate to nearest 0.5 for half-star support (optional)
  const roundedRate = Math.round(rate * 2) / 2;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1;

    // Conditional classes for filled, half-filled, or empty stars
    if (starValue <= Math.floor(roundedRate)) {
      return <FaStar key={index} className="req-star filled" />;
    } else if (
      starValue === Math.ceil(roundedRate) &&
      !Number.isInteger(roundedRate)
    ) {
      return <FaStar key={index} className="req-star half-filled" />;
    } else {
      return <FaStar key={index} className="req-star empty" />;
    }
  });

  return (
    <div className="req-pro-request-card">
      <div className="req-user-info">
        <img src={image? `data:image/jpeg;base64,${image}`
              : userImage} alt="User" />
        <span className="req-user-name">{user}</span>
        <FaCheck className="req-icon req-accept-icon" onClick={onAccept} />
        <FaTimes className="req-icon req-reject-icon" onClick={onReject} />
      </div>
      <div className="req-rating-feedback">
        <div className="req-stars">{stars}</div>
      </div>
    </div>
  );
}
