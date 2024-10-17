import React, { useState } from "react";
// import logo from "../images/logo.png";
import EvaCard from "../components/EvaCard/EvaCard";
import "../style/Evaluation.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Evaluations() {
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const location = useLocation();
  const token = useSelector((state) => state.login.token);
  const userList = location.state?.updatedList || [];
  const userImages = location.state?.userImages || [];
  const updatedUserImages = userImages.slice(1);
  const apiUrl = process.env.REACT_APP_API_URL;

  if (userList.length === 0) {
    window.location.href = "/userhomepage";
  }
  const sendFeedback = async (userList, ratings, feedbacks) => {
    const feedbackArray = userList.map((userId) => {
      return {
        programmerUsername: userId, // Use userId directly as the username
        rating: ratings[userId] || 0, // Get the rating for the current userId
        feedback: feedbacks[userId] || "", // Get the feedback for the current userId
      };
    });
    console.log("Array", feedbackArray);
    if (feedbacks.length !== 0 || ratings.length !== 0) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/auth/sendFeedback`,
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
          setFeedbacks([]);
          setRatings([]);
          return response.data;
        }
      } catch (error) {
        console.error(
          "Error sending feedback:",
          error.response?.data || error.message
        );
        throw error; // Rethrow or handle the error as needed
      }
    } else {
      window.location.href = "/userhomepage";
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
              image={updatedUserImages[index]?.image}
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
