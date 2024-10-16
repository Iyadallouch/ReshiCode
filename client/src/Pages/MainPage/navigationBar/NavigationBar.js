import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import logo from "../../../images/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../loginSlice";
import { persistor } from "../../../index";

const NavigationBar = () => {
  const [isNavActive, setNavActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const toggleNav = () => {
    setNavActive(!isNavActive);
  };
  const handleLogout = async () => {
    // Dispatch the logout action
    dispatch(logout());

    // Optionally, clear any other client-side storage, e.g., localStorage
    localStorage.removeItem("token"); // If you are using localStorage
    await persistor.purge(); // This will remove all persisted data

    // Redirect to the home page or login page
  };
  const handleScroll = (sectionId) => {
    if (sectionId === "home") {
      setNavActive(!isNavActive);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      setNavActive(!isNavActive);

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setNavActive(!isNavActive);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsHidden(scrollTop > lastScrollTop && scrollTop > 50);
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <nav
      className={`navbar ${isNavActive ? "nav-active" : ""}`}
      style={{ top: isHidden ? "-200px" : "0", transition: "top 0.3s" }}
    >
      <div className="logo">
        <a href="/" onClick={() => handleScroll("home")}>
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <ul className={`nav-links ${isNavActive ? "nav-active" : ""}`}>
        <li>
          <a href="/" onClick={() => handleScroll("home")}>
            Home
          </a>
        </li>
        <li>
          <a href="#services" onClick={() => handleScroll("services")}>
            Services
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => handleScroll("about")}>
            About
          </a>
        </li>
        <li>
          <a href="#examples" onClick={() => handleScroll("examples")}>
            Team
          </a>
        </li>
        <li>
          <a href="#contactUs" onClick={() => handleScroll("contactUs")}>
            Contact us
          </a>
        </li>

        {token === null && (
          <div>
            <li className="nav-login-link mobile">
              <a href="/login">Login</a>
            </li>
            <li className="nav-login-link mobile">
              <a href="/signup">Sign Up</a>
            </li>
          </div>
        )}
        {token != null && (
          <li className="nav-login-link mobile">
            <a href="/" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        )}
      </ul>
      <ul className="nav-login-links desktop">
        {token === null && (
          <ul className="nav-login-links desktop">
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </ul>
        )}
        {token != null && (
          <li>
            <a href="/" onClick={handleLogout}>
              Log Out
            </a>
          </li>
        )}
      </ul>

      <div
        className={`hamburger ${isNavActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <div className="bar"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
      </div>
    </nav>
  );
};

export default NavigationBar;
