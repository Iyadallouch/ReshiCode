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

function App() {
  const location = useLocation();
  const token = useSelector((state) => state.login.token);
  const userType = useSelector((state) => state.login.userType);
  return (
    <div>
      {location.pathname !== "/collaarea" && (
        <header>
          <NavigationBar />
        </header>
      )}
      <Routes>
        <Route
          path="/"
          element={
            token !== null && userType === "NORMAL_USER" ? (
              <Navigate to="/userhomepage" replace />
            ) : token !== null && userType === "PROGRAMMER" ? (
              <Navigate to="/prohomepage" replace />
            ) : (
              <All />
            )
          }
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" replace /> : <Signup />}
        />
        {/* Redirect to home if user is logged in */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
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
