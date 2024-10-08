import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import userImage from "../images/userpic.png";
import "../style/UserProfilePage.css";
import OldCode from "../components/OldCode/OldCode";
import axios from "axios";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("User Name");
  const [email, setEmail] = useState("user.email@example.com");
  const [password, setPassword] = useState("password");
  const [phone, setPhone] = useState("+1234567890");
  const [region, setRegion] = useState({ value: "Region", label: "Region" });
  const [profileImage, setProfileImage] = useState(userImage);
  const countryOptions = countryList().getData();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

        // Fetch user info
        const userInfoResponse = await axios.get(
          "http://localhost:3001/api/auth/userInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(userInfoResponse.data);

        // Fetch user codes
        const codesResponse = await axios.get(
          "http://localhost:3001/api/auth/userCode",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCodes(codesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        console.log(error);
      }
    };

    fetchData();
  }, [error]);

  console.log(userInfo);
  console.log(codes);
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

  return (
    <div className="userpro-container">
      <div className="userpro-card">
        <img src={profileImage} alt="User" className="userpro-picture" />
        <span className="userpro-detail-username">{userInfo?.username}</span>

        <hr />
        {isEditing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="userpro-file-input"
            />
          </>
        )}
        <div className="userpro-details">
          {isEditing ? (
            <>
              <div className="userpro-detail">
                <label className="userpro-detail-label">
                  <strong>Name:</strong>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="userpro-input"
                />
              </div>
              <div className="userpro-detail">
                <label className="userpro-detail-label">
                  <strong>Email:</strong>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="userpro-input"
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
              <div className="userpro-detail">
                <label className="userpro-detail-label">
                  <strong>Phone:</strong>
                </label>
                <PhoneInput
                  country={"ae"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputProps={{ name: "phone", required: true }}
                  containerClass="userpro-phone-container"
                  inputClass="userpro-phone-input"
                />
              </div>
              <div className="userpro-detail">
                <label className="userpro-detail-label">
                  <strong>Region:</strong>
                </label>
                <Select
                  options={countryOptions}
                  value={region}
                  onChange={setRegion}
                  placeholder="Select a region"
                  className="userpro-select"
                />
              </div>
            </>
          ) : (
            <>
              <div className="userpro-detail">
                <span className="userpro-detail-label">
                  <strong>Name:</strong>
                </span>
                <span className="userpro-detail-text">
                  {userInfo?.firstName} {userInfo?.lastName}
                </span>
              </div>
              <div className="userpro-detail">
                <span className="userpro-detail-label">
                  <strong>Email:</strong>
                </span>
                <span className="userpro-detail-text">{userInfo?.email}</span>
              </div>
              <div className="userpro-detail">
                <span className="userpro-detail-label">
                  <strong>Phone:</strong>
                </span>
                <span className="userpro-detail-text">
                  {userInfo?.phoneNumber}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="userpro-buttons">
          {isEditing ? (
            <>
              <button
                className="userpro-button userpro-save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="userpro-button userpro-cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="userpro-button userpro-edit-button"
                onClick={handleEdit}
              >
                Edit Account
              </button>
              <button className="userpro-button userpro-delete-button">
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>
      <h1 className="userpro-old-code">Old Code</h1>
      <div className="oldcode-container">
        {codes
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt from newest to oldest
          .map((codeEntry) => (
            <OldCode
              key={codeEntry.id} // Ensure id is a valid string or number
              date={new Date(codeEntry.createdAt).toLocaleString()} // Use the custom formatDate function
              code={codeEntry.code} // Ensure this is a string
              room={codeEntry.roomName} // Ensure this is a string
              language={codeEntry.language} // Ensure this is a string
            />
          ))}
      </div>
    </div>
  );
}
