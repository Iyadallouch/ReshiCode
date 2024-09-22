import { Route, Routes, useLocation } from "react-router-dom";
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
function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/collaarea" && (
        <header>
          <NavigationBar />
        </header>
      )}
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userhomepage" element={<UserHomepage />} />
        <Route path="/prohomepage" element={<ProHomepage />} />
        <Route path="/collaarea" element={<CollaArea />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/proprofile" element={<ProProfile />} />
        <Route path="/evaluations" element={<Evaluations />} />
      </Routes>
    </div>
  );
}

export default App;
