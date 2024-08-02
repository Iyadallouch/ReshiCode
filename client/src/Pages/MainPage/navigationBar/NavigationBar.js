import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import logo from '../../../images/logo.png';

const NavigationBar = () => {
    const [isNavActive, setNavActive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const toggleNav = () => {
        setNavActive(!isNavActive);
    };

    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsHidden(scrollTop > lastScrollTop && scrollTop > 1);
            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    return (
        <nav className={`navbar ${isNavActive ? 'nav-active' : ''}`} style={{ top: isHidden ? '-200px' : '0', transition: 'top 0.3s' }}>
            <div className="logo"><img src={logo} alt="Logo" /></div>
            <ul className="nav-links">
                <li><a href="#home" onClick={() => handleScroll('home')}>Home</a></li>
                <li><a href="#services" onClick={() => handleScroll('services')}>Services</a></li>
                <li><a href="#about" onClick={() => handleScroll('about')}>About</a></li>
                <li><a href="#examples" onClick={() => handleScroll('examples')}>Projects</a></li>
                <li><a href="#contactUs" onClick={() => handleScroll('contactUs')}>Contact us</a></li>
            </ul>
            <ul className="nav-login-links">
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign Up</a></li>
            </ul>
            <div className={`hamburger ${isNavActive ? 'active' : ''}`} onClick={toggleNav}>
                <div className="bar"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
            </div>
        </nav>
    );
};

export default NavigationBar;
