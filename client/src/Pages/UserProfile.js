import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "../images/userpic.png";
import "../style/UserProfilePage.css";
import OldCode from "../components/OldCode/OldCode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { login, updateImage } from "../loginSlice";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [codes, setCodes] = useState([]);
  const [languageFilter, setLanguageFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await axios.get(
          `${apiUrl}/api/auth/userInfo`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo(userInfoResponse.data);
        setUserName(userInfoResponse.data.username);
        setEmail(userInfoResponse.data.email);
        setPhone(userInfoResponse.data.phoneNumber);

        const codesResponse = await axios.get(`${apiUrl}/api/auth/userCode`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCodes(codesResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, [token]);

  const filteredCodes = codes
    .filter((codeEntry) => {
      return (
        (languageFilter ? codeEntry.language === languageFilter : true) &&
        (searchTerm
          ? codeEntry.roomName.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    })
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

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
        if (profileImage) {
          try {
            // Wait for the dispatch to complete if `updateImage` is asynchronous
            await dispatch(
              updateImage({
                userImage: response.data.Image,
              })
            );
          } catch (error) {
            console.error("Failed to update image in Redux", error);
          }
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

  return (
    <div className="userpro-container">
      <div className="userpro-card">
        <img
          src={
            preview
              ? preview
              : userImage
              ? `data:image/jpeg;base64,${userImage}`
              : Image
          }
          alt="User"
          className="userpro-picture"
        />
        <span className="userpro-detail-username">{userInfo?.username}</span>
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p className="error-text">{error}</p>
          </div>
        )}
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
                  <strong>User name:</strong>
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
                onClick={handleSave} // Call handleSave onClick
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
      <h1 className="userpro-old-code">Saved Codes</h1>
      <div className="userpro-filtering-component">
        <div className="userpro-filter">
          <label htmlFor="languageFilter">Filter by Language:</label>
          <select
            id="languageFilter"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="userpro-search">
          <label htmlFor="roomSearch">Search by Room Name:</label>
          <input
            id="roomSearch"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter room name..."
          />
        </div>
        <div className="userpro-sort">
          <label htmlFor="sortOrder">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="oldcode-container">
        {filteredCodes.length === 0 ? (
          <h1>No data found</h1>
        ) : (
          filteredCodes.map((code) => (
            <OldCode
              key={code._id}
              date={code.createdAt}
              code={code.code}
              room={code.roomName}
              language={code.language}
            />
          ))
        )}
      </div>
    </div>
  );
}
