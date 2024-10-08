import React, { useState } from "react";
// import logo from "../images/logo.png";
import EvaCard from "../components/EvaCard/EvaCard";
import "../style/Evaluation.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Evaluations() {
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const location = useLocation();
  const userList = location.state?.updatedList || [];

  const sendFeedback = async (userList, ratings, feedbacks) => {
    const token = localStorage.getItem("token"); // Assuming you're storing the token in local storage
    const feedbackArray = userList.map((userId) => {
      return {
        programmerUsername: userId, // Use userId directly as the username
        rating: ratings[userId], // Get the rating for the current userId
        feedback: feedbacks[userId], // Get the feedback for the current userId
      };
    });
    console.log("Array", feedbackArray);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/sendFeedback",
        {
          feedbackArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token for authentication
          },
        }
      );

      console.log("Feedback sent successfully:", response.data);
      if (response.data) {
        window.location.href = "/userhomepage";
        return response.data;
      }
    } catch (error) {
      console.error(
        "Error sending feedback:",
        error.response?.data || error.message
      );
      throw error; // Rethrow or handle the error as needed
    }
  };

  const handleRatingChange = (programmerId, value) => {
    setRatings((prevState) => ({
      ...prevState,
      [programmerId]: value,
    }));
  };
  console.log(feedbacks);
  console.log(ratings);
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
          {userList.map((programmer, index) => (
            <EvaCard
              key={index}
              programmer={programmer}
              rating={ratings[programmer] || 0}
              feedback={feedbacks[programmer] || ""}
              onRatingChange={handleRatingChange}
              onFeedbackChange={handleFeedbackChange}
            />
          ))}
        </div>
        <div className="evaluations-next-page-button-container">
          <button
            className="evaluations-next-page-button"
            onClick={() => sendFeedback(userList, ratings, feedbacks)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
