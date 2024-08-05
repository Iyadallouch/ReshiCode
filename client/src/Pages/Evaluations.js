import React, { useState } from "react";
// import logo from "../images/logo.png";
import EvaCard from "../components/EvaCard/EvaCard";
import "../style/Evaluation.css";

const programmers = [
  { id: 1, name: "M7md", feedback: "" },
  { id: 2, name: "Adam", feedback: "" },
  { id: 3, name: "Roz", feedback: "" },
  { id: 4, name: "Zain", feedback: "" },
  { id: 5, name: "Eyad", feedback: "" },
];

export default function Evaluations() {
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});

  const handleRatingChange = (programmerId, value) => {
    setRatings((prevState) => ({
      ...prevState,
      [programmerId]: value,
    }));
  };

  const handleFeedbackChange = (programmerId, event) => {
    setFeedbacks((prevState) => ({
      ...prevState,
      [programmerId]: event.target.value,
    }));
  };

  return (
    <div className="evaluations-container">
      <div className="evaluations-upper-section">
        {/* <img src={logo} alt="Website Logo" className="evaluations-logo" /> */}
        <div className="evaluations-header-text">
          <h1 className="evaluations-website-name">Evaluation Area</h1>
          <p className="evaluations-instructions">
            Please rate and provide feedback for each programmer
          </p>
        </div>
      </div>

      <div className="evaluations-bottom-section">
        <div className="evacard-programmers-container">
          {programmers.map((programmer) => (
            <EvaCard
              key={programmer.id}
              programmer={programmer}
              rating={ratings[programmer.id] || 0}
              feedback={feedbacks[programmer.id] || ""}
              onRatingChange={handleRatingChange}
              onFeedbackChange={handleFeedbackChange}
            />
          ))}
        </div>
        <div className="evaluations-next-page-button-container">
          <button className="evaluations-next-page-button">Next</button>
        </div>
      </div>
    </div>
  );
}
