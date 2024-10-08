import React from "react";
import userImage from "../../images/userpic.png"; // Navigate up two levels to reach 'src/images'
import "./EvaCard.css"; // Import the CSS file for EvaCard

const RatingStars = ({ programmerId, rating, onRatingChange }) => (
  <div className="evacard-rating-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={
          star <= rating ? "evacard-star-filled" : "evacard-star-empty"
        }
        onClick={() => onRatingChange(programmerId, star)}
      >
        &#9733; {/* Unicode star character */}
      </span>
    ))}
  </div>
);

const FeedbackInput = ({ programmerId, feedback, onFeedbackChange }) => (
  <div className="evacard-feedback-section">
    <label className="evacard-feedback-label">Feedback:</label>
    <textarea
      className="evacard-feedback-input"
      placeholder="Write your feedback..."
      value={feedback}
      onChange={(e) => onFeedbackChange(programmerId, e)}
    />
  </div>
);

const EvaCard = ({
  programmer,
  onRatingChange,
  onFeedbackChange,
  rating,
  feedback,
}) => (
  <div className="evacard-programmer">
    <div className="evacard-header">
      <div className="user-info">
        <img className="evacard-user-image" alt="user" src={userImage} />
        <div className="evacard-prog-name">{programmer}</div>
      </div>
      <RatingStars
        programmerId={programmer}
        rating={rating}
        onRatingChange={onRatingChange}
      />
    </div>
    <FeedbackInput
      programmerId={programmer}
      feedback={feedback}
      onFeedbackChange={onFeedbackChange}
    />
  </div>
);

export default EvaCard;
