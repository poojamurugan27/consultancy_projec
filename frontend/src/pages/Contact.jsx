import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import "./css/contact.css";

const Contact = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_wcko63x', 'template_81efahz', form.current, {
        publicKey: 'd8tQEbB11lprWjBHJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset(); // Clear form fields after successful submission
          setPopupMessage('Message sent successfully!');
          setShowPopup(true); // Show the popup
        },
        (error) => {
          console.log('FAILED...', error.text);
          setPopupMessage('Failed to send message. Please try again.'); // Set error message
          setShowPopup(true); // Show the popup
        },
      );
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div>
      <div className="container">
        <a href="home.html" className="back-link">&#8592; Back to Home</a>
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">Contact</p>
            <div className="info">
              <div className="information">
                <p>492 Muthur Road, Elumathur, Erode-4.</p>
              </div>
              <p className="text">Phone Number</p> 
              <div className="information">
                <p>7639577713</p>
              </div>
              <p className="text">Email Id</p> 
              <div className="information">
                <p>poojam.21cse@kongu.edu</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
            <form ref={form} onSubmit={sendEmail} autoComplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input type="text" name="from_name" className="input" placeholder="Username"/>
                <span>Username</span>
              </div>
              <div className="input-container">
                <input type="email" name="from_email" className="input" placeholder="Email"/>
                <span>Email</span>
              </div>
              <div className="input-container textarea">
                <textarea name="message" className="input" placeholder="Message"></textarea>
                <span>Message</span>
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <p>{popupMessage}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
