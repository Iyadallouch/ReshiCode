import React from "react";
import "./Services.css";
import { ReactTyped } from "react-typed"; // Import the Typed component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faRobot,
  faLaptopCode,
  faMessage,
  
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <div id="services">
      <div className="achievements">
        <h1 className="typing-animation">
          <ReactTyped
            strings={["Our Services"]}
            typeSpeed={70}
            showCursor={true}
            loop={true}
            backDelay={2000}
          />
        </h1>
        <div>
          <div className="services-card">
            <div className="counting-number">
              <div className="opacity">
                <FontAwesomeIcon className="icon" icon={faComments} size="5x" />

                <p className="font-multiColor">Chat</p>
              </div>
              <p className="description">
                "Live chat between user and programmer provides instant support
                to resolve programming issues, enhance user experience and
                enable solving errors"
              </p>
            </div>
          </div>
          <div className="services-card">
            <div className="counting-number">
              <div className="opacity">
                <FontAwesomeIcon className="icon" icon={faRobot} size="5x" />
                <p className="font-multiColor">Chatbot</p>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-robot" />
              <p className="description">
                "Our brainy chatbot acts as an energetic resource, empowering
                students to explore their questions thoroughly and grasp the
                content with clarity"
              </p>
            </div>
          </div>
          <div className="services-card">
            <div className="counting-number">
              <div className="opacity">
                <FontAwesomeIcon
                  className="icon"
                  icon={faLaptopCode}
                  size="5x"
                />

                <p className="font-multiColor">Live</p>
              </div>
              <p className="description">
                "Live feature ensures immediate problem solving, updated chat
                with programmers, and additional features that support live
                actions and meet user’s expectation"
              </p>
            </div>
          </div>
          <div className="services-card">
            <div className="counting-number">
              <div className="opacity">
                <FontAwesomeIcon
                  className="icon"
                  icon={faMessage}
                  size="5x"
                />

                <p className="font-multiColor">Feedback</p>
              </div>
              <p className="description">
                "It allows users to rate and write about programmers, so other
                users can choose the most suitable programmer easily to solve
                errors effectively.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
