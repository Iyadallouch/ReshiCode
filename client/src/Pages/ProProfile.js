import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import userImage from "../images/userpic.png";
import "../style/ProProfilePage.css";
import Feedback from "../components/Feedback/Feedback";
import axios from "axios";

export default function ProProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("User Name");
  const [email, setEmail] = useState("user.email@example.com");
  const [password, setPassword] = useState("password");
  const [phone, setPhone] = useState("+1234567890");
  const [region, setRegion] = useState({ value: "Region", label: "Region" });
  const [profileImage, setProfileImage] = useState(userImage);
  const [feedbackData, setFeedbackData] = useState([]);

  const countryOptions = countryList().getData();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", options)
      .replace(/(\w+)\s(\d+),\s(\d+)/, "$2-$1-$3");
  };
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    // Here you would typically handle saving the data
    setIsEditing(false);
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/auth/getFeedback",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  return (
    <div className="pro-prof-container">
      <div className="pro-prof-card">
        <img src={profileImage} alt="User" className="pro-prof-picture" />
        <hr />
        {isEditing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="pro-prof-file-input"
            />
          </>
        )}
        <div className="pro-prof-details">
          {isEditing ? (
            <>
              <div className="pro-prof-detail">
                <label className="pro-prof-detail-label">
                  <strong>Name:</strong>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="pro-prof-input"
                />
              </div>
              <div className="pro-prof-detail">
                <label className="pro-prof-detail-label">
                  <strong>Email:</strong>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pro-prof-input"
                />
              </div>
              <div className="pro-prof-detail">
                <label className="pro-prof-detail-label">
                  <strong>Password:</strong>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pro-prof-input"
                />
              </div>
              <div className="pro-prof-detail">
                <label className="pro-prof-detail-label">
                  <strong>Phone:</strong>
                </label>
                <PhoneInput
                  country={"ae"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputProps={{ name: "phone", required: true }}
                  containerClass="pro-prof-phone-container"
                  inputClass="pro-prof-phone-input"
                />
              </div>
              <div className="pro-prof-detail">
                <label className="pro-prof-detail-label">
                  <strong>Region:</strong>
                </label>
                <Select
                  options={countryOptions}
                  value={region}
                  onChange={setRegion}
                  placeholder="Select a region"
                  className="pro-prof-select"
                />
              </div>
            </>
          ) : (
            <>
              <div className="pro-prof-detail">
                <span className="pro-prof-detail-label">
                  <strong>Name:</strong>
                </span>
                <span className="pro-prof-detail-text">{userName}</span>
              </div>
              <div className="pro-prof-detail">
                <span className="pro-prof-detail-label">
                  <strong>Email:</strong>
                </span>
                <span className="pro-prof-detail-text">{email}</span>
              </div>
              <div className="pro-prof-detail">
                <span className="pro-prof-detail-label">
                  <strong>Password:</strong>
                </span>
                <span className="pro-prof-detail-text">********</span>
              </div>
              <div className="pro-prof-detail">
                <span className="pro-prof-detail-label">
                  <strong>Phone:</strong>
                </span>
                <span className="pro-prof-detail-text">{phone}</span>
              </div>
              <div className="pro-prof-detail">
                <span className="pro-prof-detail-label">
                  <strong>Region:</strong>
                </span>
                <span className="pro-prof-detail-text">{region.label}</span>
              </div>
            </>
          )}
        </div>
        <div className="pro-prof-buttons">
          {isEditing ? (
            <>
              <button
                className="pro-prof-button pro-prof-save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="pro-prof-button pro-prof-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="pro-prof-button pro-prof-edit-button"
                onClick={handleEdit}
              >
                Edit Account
              </button>
              <button className="pro-prof-button pro-prof-delete-button">
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>
      <h1 className="pro-prof-feedback">Feedback</h1>
      <div className="feedback-container">
        {feedbackData.map((feedback, index) => (
          <Feedback
            key={index}
            feedback={feedback.feedback}
            username={feedback.createdBy.username}
            date={formatDate(feedback.createdAt)}
          />
        ))}
      </div>
    </div>
  );
}
