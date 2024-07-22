import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserChoose from "./Pages/UserChoose";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import UserHomepage from "./Pages/UserHomepage";
import ProHomepage from "./Pages/ProHomepage";
import CollaArea from "./Pages/CollaArea";
import "./global.css";

function App() {
  return (
    <div className="background">
      <Router>
        {/* here for the header if we create one later on  */}
        <Routes>
          <Route path="/" element={<UserChoose />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userhomepage" element={<UserHomepage />}></Route>
          <Route path="/prohomepage" element={<ProHomepage />}></Route>
          <Route path="/collaarea" element={<CollaArea />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
