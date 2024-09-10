import React, { useRef } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from "../navbar/navbar.js";
import Heroimg from "../herosection/hersection.js";
import PhotoGallery from '../photogallery/photogallery.js';
import About from "../About/about.js";
import Features from "../features/features.js";
import Faqs from "../faqs/faqs.js";
import Contact from "../contact/contact.js";
import Footer from "../footer/footer.js";
import "./homepage.css"; 
const Homepage = () => {
  const featuresRef = useRef(null);
  const faqsRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFaqs = () => {
    faqsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const homepageStyle = {
    background: '#222222',
    backgroundSize: 'cover',
    minHeight: '100vh',
    color: '#fff',
  };

  return (
    <div className="homepage" style={homepageStyle}>
      <Navbar />
      <Heroimg onExploreClick={scrollToFeatures} />
      <PhotoGallery />
      <About />
      <div ref={featuresRef}>
        <Features />
      </div>
      <div ref={faqsRef} id="faqs">
        <Faqs />
      </div>
      <section id="contact-cta" style={ctaStyle}>
        <h2 style={contactheading}>Get in Touch</h2>
        <p style={pdata}>Have any questions? We'd love to hear from you.</p>
        <Link to="/contact" className="cta-button">Contact Us</Link>  {/* Use the class here */}
      </section>
    </div>
  );
}

const ctaStyle = {
  textAlign: 'center',
  padding: '50px 0',
  background: 'transparent',
};

const contactheading = {
  textAlign: 'center',
  marginBottom: '20px',
  color: 'white',  
  fontSize: '4rem',
  fontFamily: 'Expletus Sans',
};

const pdata = {
  marginBottom: '20px',
  fontSize: '2.5rem',
  fontFamily: 'Expletus Sans',
};

export default Homepage;
