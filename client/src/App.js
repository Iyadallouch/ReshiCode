import { Route, Routes, useLocation, Navigate } from "react-router-dom";
//import UserChoose from "./Pages/UserChoose";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import UserHomepage from "./Pages/UserHomepage";
import ProHomepage from "./Pages/ProHomepage";
import CollaArea from "./Pages/CollaArea";
import UserProfile from "./Pages/UserProfile";
import ProProfile from "./Pages/ProProfile";
import Evaluations from "./Pages/Evaluations";
import "./global.css";
import All from "./Pages/MainPage/All";
import NavigationBar from "./Pages/MainPage/navigationBar/NavigationBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "./loginSlice";
import { persistor } from "./index";

function App() {
  const location = useLocation();
  const token = useSelector((state) => state.login.token);
  const userType = useSelector((state) => state.login.userType);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());

    // Optionally, clear any other client-side storage, e.g., localStorage
    localStorage.removeItem("token"); // If you are using localStorage
    await persistor.purge(); // This will remove all persisted data
    window.location.reload();
    window.location.href = "/login"; // Redirect to login page
  };
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        const remainingTime = (decodedToken.exp - currentTime) * 1000; // Time in milliseconds

        if (remainingTime > 0) {
          const timer = setTimeout(() => {
            handleLogout(); // Call logout when the token is expired
          }, remainingTime);

          // Clear the timeout if the token changes or on unmount
          return () => clearTimeout(timer);
        } else {
          // Token is already expired, log out immediately
          handleLogout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    }
  }, [token]); // Depend on token, so it rechecks if token changes

  return (
    <div>
      {location.pathname !== "/collaarea" && (
        <header>
          <NavigationBar />
        </header>
      )}
      <Routes>
        <Route
          path="/signup"
          element={token ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route path="/" element={<All />} />
        {/* Redirect to home if user is logged in */}
        <Route
          path="/login"
          element={
            token !== null && userType === "NORMAL_USER" ? (
              <Navigate to="/userhomepage" replace />
            ) : token !== null && userType === "PROGRAMMER" ? (
              <Navigate to="/prohomepage" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/userhomepage"
          element={
            token !== null && userType === "NORMAL_USER" ? (
              <UserHomepage />
            ) : token !== null && userType === "PROGRAMMER" ? (
              <Navigate to="/prohomepage" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/prohomepage"
          element={
            token !== null && userType === "PROGRAMMER" ? (
              <ProHomepage />
            ) : token !== null && userType === "NORMAL_USER" ? (
              <Navigate to="/userhomepage" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/collaarea"
          element={token !== null ? <CollaArea /> : <Navigate to="/" replace />}
        />
        <Route
          path="/userprofile"
          element={
            token !== null && userType === "NORMAL_USER" ? (
              <UserProfile />
            ) : token !== null && userType === "PROGRAMMER" ? (
              <Navigate to="/proprofile" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/proprofile"
          element={
            token !== null && userType === "PROGRAMMER" ? (
              <ProProfile />
            ) : token !== null && userType === "NORMAL_USER" ? (
              <Navigate to="/userprofile" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/evaluations"
          element={
            token !== null && userType === "NORMAL_USER" ? (
              <Evaluations />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
