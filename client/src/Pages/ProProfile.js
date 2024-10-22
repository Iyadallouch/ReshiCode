import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "../images/userpic.png";
import "../style/ProProfilePage.css";
import Feedback from "../components/Feedback/Feedback";
import axios from "axios";
import { useSelector } from "react-redux";
import StarRating from "../components/Stars/StarRating";
import PhoneInput from "react-phone-input-2";

export default function ProProfile() {
  const [feedbackData, setFeedbackData] = useState([]);
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("User Name");
  const [email, setEmail] = useState("user.email@example.com");
  const [phone, setPhone] = useState("+1234567890");
  const [profileImage, setProfileImage] = useState(userImage);

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
        const userInfoResponse = await axios.get(
          `${apiUrl}/api/auth/userInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await axios.get(`${apiUrl}/api/auth/getFeedback`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
            </>
          ) : (
            <>
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
                <span className="pro-prof-detail-text">
                  {userInfo.phoneNumber}
                </span>
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
