import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import logo from "../../../images/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../loginSlice";
import { persistor } from "../../../index";
import { useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [isNavActive, setNavActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const token = useSelector((state) => state.login.token);
  const userType = useSelector((state) => state.login.userType);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleNav = () => {
    setNavActive(!isNavActive);
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
  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem("token");
    await persistor.purge();
  };

  const handleScrollToSection = (sectionId) => {
    setNavActive(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsHidden(scrollTop > lastScrollTop && scrollTop > 50);
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  // Ensure navigation and scroll behavior after page fully loads
  useEffect(() => {
    const handlePageLoad = () => {
      if (location.hash) {
        const sectionId = location.hash.replace("#", "");
        handleScrollToSection(sectionId);
      }
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [location]);

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
          <a
            href={
              userType === "NORMAL_USER"
                ? "/userhomepage"
                : userType === "PROGRAMMER"
                ? "/prohomepage"
                : "/"
            }
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#services"
            to="/#services"
            onClick={() => handleScroll("services")}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/#about"
            to="/#aboutUs"
            onClick={() => handleScroll("about")}
          >
            About
          </a>
        </li>
        <li>
          <a href="/#examples" to="/" onClick={() => handleScroll("examples")}>
            Team
          </a>
        </li>
        <li>
          <a
            href="/#contactUs"
            to="/"
            onClick={() => handleScroll("contactUs")}
          >
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
