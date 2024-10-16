import React, { useState } from "react";
import "./PasswordField.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import the eye icons
import { PiFlashlightLight, PiFlashlightFill } from "react-icons/pi";

function PasswordField({ password, setPassword }) {
  const [passwordType, setPasswordType] = useState("password");
  const [beamOn, setBeamOn] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setBeamOn(!beamOn);
  };

  return (
    <div className="passwordfield-center">
      <input
        type={passwordType}
        className="passwordfield-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Bind the state from parent
      />
      <div className="passwordfield-light" onClick={togglePasswordVisibility}>
        {passwordType === "password" ? (
          <PiFlashlightLight className="rotate-light" />
        ) : (
          <PiFlashlightFill className="rotate-light" />
        )}

        <div className={`passwordfield-beam ${beamOn ? "on" : ""}`}></div>
      </div>
    </div>
  );
}

export default PasswordField;
