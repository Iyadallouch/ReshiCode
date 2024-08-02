import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserChoose from "./Pages/UserChoose";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import UserHomepage from "./Pages/UserHomepage";
import ProHomepage from "./Pages/ProHomepage";
import CollaArea from "./Pages/CollaArea";
import UserProfile from "./Pages/UserProfile";
import ProProfile from "./Pages/ProProfile";
import Evaluations from './Pages/Evaluations';
import "./global.css";
import All from "./Pages/MainPage/All";
function App() {
  return (
    <div className="background">
      <Router>
        {/* here for the header if we create one later on  */}
        <Routes>
          <Route path="/" element={<All />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userhomepage" element={<UserHomepage />}></Route>
          <Route path="/prohomepage" element={<ProHomepage />}></Route>
          <Route path="/collaarea" element={<CollaArea />}></Route>
          <Route path="/userprofile" element={<UserProfile />}></Route>
          <Route path="/proprofile" element={<ProProfile />}></Route>
          <Route path="/evaluations" element={<Evaluations />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
