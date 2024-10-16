import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "../images/userpic.png";
import "../style/ProProfilePage.css";
import Feedback from "../components/Feedback/Feedback";
import axios from "axios";
import { useSelector } from "react-redux";
import StarRating from "../components/Stars/StarRating";

export default function ProProfile() {
  const [feedbackData, setFeedbackData] = useState([]);
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  console.log(token);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\w+)\s(\d+),\s(\d+)/, "$2-$1-$3");
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const userInfoResponse = await axios.get(
          "http://localhost:3001/api/auth/userInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await axios.get(
          "http://localhost:3001/api/auth/getFeedback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserInfo(userInfoResponse.data);
        // Check if 'feedbacks' key exists and is an array
        const feedbackArray = response.data.feedbacks || [];
        setFeedbackData(feedbackArray);
        console.log("Feedback retrieved successfully:", feedbackData);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "An error occurred while fetching feedback.";
        console.error("Error retrieving feedback:", errorMessage);
        alert(errorMessage);
      }
    };

    fetchFeedback();
  }, []); // Runs only once on mount
  console.log(userInfo);

  return (
    <div className="pro-prof-container">
      <div className="pro-prof-card">
        <img
          src={userImage ? `data:image/jpeg;base64,${userImage}` : Image}
          alt="User"
          className="pro-prof-picture"
        />
        <span className="userpro-detail-username">{userInfo.username}</span>
        <div style={{ margin: "10px 10px 20px 10px" }}>
          <StarRating rating={userInfo.programmerInfo?.rate} />
        </div>

        <hr />

        <div className="pro-prof-details">
          <div className="pro-prof-detail">
            <span className="pro-prof-detail-label">
              <strong>Name:</strong>
            </span>
            <span className="pro-prof-detail-text">
              {userInfo.firstName} {userInfo.lastName}
            </span>
          </div>
          <div className="pro-prof-detail">
            <span className="pro-prof-detail-label">
              <strong>Email:</strong>
            </span>
            <span className="pro-prof-detail-text">{userInfo.email}</span>
          </div>

          <div className="pro-prof-detail">
            <span className="pro-prof-detail-label">
              <strong>Phone:</strong>
            </span>
            <span className="pro-prof-detail-text">{userInfo.phoneNumber}</span>
          </div>
        </div>
        <div className="pro-prof-buttons"></div>
      </div>
      <h1 className="pro-prof-feedback">Feedback</h1>
      <div className="feedback-container">
        {feedbackData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((feedback, index) => (
            <Feedback
              key={index}
              feedback={feedback.feedback}
              username={feedback.createdBy.username}
              date={formatDate(feedback.createdAt)}
              rate={feedback.rate}
            />
          ))}
      </div>
    </div>
  );
}
