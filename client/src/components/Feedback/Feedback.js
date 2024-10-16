import React from "react";
import "./Feedback.css";
import { FaStar } from "react-icons/fa";
import StarRating from "../Stars/StarRating";

export default function Feedback({ feedback, username, date, rate }) {
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
    <div className="feedback-card">
      <div className="feedback-info-container">
        <p className="feedback-paragraph">{feedback}</p>
        <div className="req-rating-feedback">
        <StarRating rating={rate} />
        </div>
      </div>
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
