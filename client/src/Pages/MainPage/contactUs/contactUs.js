import React from 'react';
import './contactUs.css'; // Import your CSS file for styling

const ContactUs = () => {
    return (
        <div className="contactUs" id="contactUs">

           <h1>Contact Us</h1>
           <p>We are here to help you. Feel free to reach out to us!</p>
           <div className="contactForm">
               <a href="tel:+971569164878" style={{ fontFamily: "'Times New Roman', Times, serif" }}>+971569164878</a>
           </div>
           <p style={{marginTop:'30px'}}>Or</p>
           <div className="contactForm">
           <a href="mailto:202010096@aau.ac.ae" style={{ fontFamily: "'Times New Roman', Times, serif" }}>202010096@aau.ac.ae</a>
           </div>

            
        </div>
    );
};

export default ContactUs;
