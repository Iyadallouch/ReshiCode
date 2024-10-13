import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "../images/userpic.png";
import "../style/UserProfilePage.css";
import OldCode from "../components/OldCode/OldCode";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [codes, setCodes] = useState([]);
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  useEffect(() => {
    const fetchData = async () => {
      try {
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

  return (
    <div className="userpro-container">
      <div className="userpro-card">
        <img
          src={userImage ? `data:image/jpeg;base64,${userImage}` : Image}
          alt="User"
          className="userpro-picture"
        />
        <span className="userpro-detail-username">{userInfo?.username}</span>

        <hr />

        <div className="userpro-details">
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
            <span className="userpro-detail-text">{userInfo?.phoneNumber}</span>
          </div>
        </div>
        <div className="userpro-buttons"></div>
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
