// StarRating.js
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

import "./StarRating.css";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  // Round the rating to the nearest half
  const roundedRate = Math.round(rating * 2) / 2;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1;

    if (starValue <= Math.floor(roundedRate)) {
      // Fully filled star
      return <FaStar key={index} className="star filled" />;
    } else if (
      starValue === Math.ceil(roundedRate) &&
      !Number.isInteger(roundedRate)
    ) {
      // Half-filled star
      return <FaStarHalfAlt key={index} className="star filled" />;
    } else {
      // Empty star
      return <FaStar key={index} className="star empty" />;
    }
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
