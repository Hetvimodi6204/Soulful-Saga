import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import "./contact.css";
import Footer from "../footer/footer.js"
import Navbar from "../navbar/navbar.js"
const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_iyiqdhg', 'template_trp974m', form.current, 'Mls2ksXYK-zcTXbPY')
      .then(
        (result) => {
          console.log('Email successfully sent:', result.text);
        },
        (error) => {
          console.error('Failed to send email:', error.text);
        }
      );
  };

  return (
    <div className="contact-container">
      <Navbar />
      <div className="contact-image">
        <div className="contact-overlay">

          <div className="contact-form">
            <h2 className="Contact-header">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name="from_name" placeholder='Name'/>
              <input type="email" name="from_email" placeholder='Email'/>
              <textarea name="message" placeholder='Message'/>
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
