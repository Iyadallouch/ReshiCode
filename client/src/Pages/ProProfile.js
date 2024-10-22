import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "../images/userpic.png";
import "../style/ProProfilePage.css";
import Feedback from "../components/Feedback/Feedback";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "../components/Stars/StarRating";
import PhoneInput from "react-phone-input-2";
import { logout, update } from "../loginSlice";
import { persistor } from "../index";
import DeleteAccountAlert from "./DeleteAccountAlert";
export default function ProProfile() {
  const [feedbackData, setFeedbackData] = useState([]);
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false); // State for modal visibility

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
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/deleteUser`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response) {
        dispatch(logout());
        localStorage.removeItem("token");
        await persistor.purge();
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("phoneNumber", phone);
      if (profileImage) {
        formData.append("image", profileImage);
      }
      console.log(formData);
      const response = await axios.post(
        `${apiUrl}/api/auth/updateUser`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle successful response
      if (response) {
        try {
          // Wait for the dispatch to complete if `updateImage` is asynchronous
          await dispatch(
            update({
              username: response.data.username,
              token: response.data.token,
              userImage: response.data.Image,
            })
          );
        } catch (error) {
          console.error("Failed to update user Info in Redux", error);
        }

        window.location.reload(); // Refresh the page after successful update
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        setError(error.response.data.message || "Failed to update user");
      } else {
        console.error("Error:", error.message);
        setError("An unknown error occurred");
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  console.log(feedbackData);
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
        setUserInfo(userInfoResponse?.data);
        setUserName(userInfoResponse?.data.username);
        setEmail(userInfoResponse?.data.email);
        setPhone(userInfoResponse?.data.phoneNumber);
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
  const handleDeleteClick = () => {
    setShowModal(true); // Show the confirmation modal
  };
  return (
    <div className="pro-prof-container">
      <div className="pro-prof-card">
        <img
          src={
            preview
              ? preview
              : userImage
              ? `data:image/jpeg;base64,${userImage}`
              : Image
          }
          alt="User"
          className="pro-prof-picture"
        />
        <span className="userpro-detail-username">{userInfo.username}</span>
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p className="error-text">{error}</p>
          </div>
        )}
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
                  <strong>User name:</strong>
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
              <button
                className="pro-prof-button pro-prof-delete-button"
                onClick={handleDeleteClick}
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>
      <h1 className="pro-prof-feedback">Feedback</h1>
      <div className="feedback-container">
        {" "}
        {feedbackData.length === 0 ? <h1>No data found</h1> : ""}
        {feedbackData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((feedback, index) => (
            <Feedback
              key={index}
              feedback={feedback.feedback}
              username={feedback.createdBy}
              date={formatDate(feedback.createdAt)}
              rate={feedback.rate}
            />
          ))}
      </div>
      <DeleteAccountAlert
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
