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
  const [languageFilter, setLanguageFilter] = useState(""); // State for language filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [sortOrder, setSortOrder] = useState("newest"); // State for sorting order
  const token = useSelector((state) => state.login.token);
  const userImage = useSelector((state) => state.login.userImage);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userInfoResponse = await axios.get(
          `${apiUrl}:3001/api/auth/userInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserInfo(userInfoResponse.data);

        // Fetch user codes
        const codesResponse = await axios.get(
          `${apiUrl}:3001/api/auth/userCode`,
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
  }, [token]);

  console.log(userInfo);
  console.log(codes);

  // Filter codes based on language and room name search term
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
      // Sort based on the selected order
      return sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt) // Newest to oldest
        : new Date(a.createdAt) - new Date(b.createdAt); // Oldest to newest
    });

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
      <h1 className="userpro-old-code">Saved Codes</h1>
      <div className="userpro-filtering-component">
        {/* Language Filter */}
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
            {/* Add more languages as needed */}
          </select>
        </div>
        {/* Search by Room Name */}
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

        {/* Sort Order Toggle */}
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
          <h1>No data found</h1> // Display "No data found" if there are no filtered codes
        ) : (
          filteredCodes.map((codeEntry) => (
            <div>
              <OldCode
                key={codeEntry.id} // Ensure id is a valid string or number
                date={new Date(codeEntry.createdAt).toLocaleString()} // Use the custom formatDate function
                code={codeEntry.code} // Ensure this is a string
                room={codeEntry.roomName} // Ensure this is a string
                language={codeEntry.language} // Ensure this is a string
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
