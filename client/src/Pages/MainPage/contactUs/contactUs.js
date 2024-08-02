import React from 'react';
import './contactUs.css'; // Import your CSS file for styling

const ContactUs = () => {
    return (
        <div className="contactUs" id="contactUs">

           <h1>Contact Us</h1>
           <p>We are here to help you. Feel free to reach out to us!</p>
           <div className="contactForm">
               <a href="tel:+97100000" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Test</a>
           </div>
           <p style={{marginTop:'30px'}}>Or</p>
           <div className="contactForm">
           <a href="mailto:example@example.com" style={{ fontFamily: "'Times New Roman', Times, serif" }}>test</a>
           </div>

            
        </div>
    );
};

export default ContactUs;
