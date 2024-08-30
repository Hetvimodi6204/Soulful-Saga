import React, { useRef, useEffect, useState } from 'react';
import Img1 from '../Images/about.png';
import Img2 from '../Images/team1.jpg';
import Img3 from '../Images/team2.jpg';
import { FaLinkedin, FaGithubSquare, FaWhatsappSquare } from "react-icons/fa"
import './aboutus.css';

const AboutUs = () => {
  const [visibleElements, setVisibleElements] = useState({
    aboutText: false,
    missionCards: false,
    teamMembers: false
  });

  const aboutTextRef = useRef(null);
  const missionCardsRef = useRef(null);
  const teamMembersRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY + window.innerHeight;

    const isVisible = (ref) => {
      return ref.current && ref.current.getBoundingClientRect().top < window.innerHeight;
    };

    setVisibleElements({
      aboutText: isVisible(aboutTextRef),
      missionCards: isVisible(missionCardsRef),
      teamMembers: isVisible(teamMembersRef)
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Section 1: About Us Heading and Description */}
      <div className="bg-abt">
        <div className="top-image-container">
          <div className="top-image"></div>
          <div className="center-card-container">
            <div className={`center-card reveal ${visibleElements.aboutText ? 'visible' : ''}`}>
              <p ref={aboutTextRef}>
                <h1 className="top-header"> About Us</h1>
                Welcome to our spiritual journey. At Soulful Saga, we embark on a journey to foster spiritual growth and inner peace. Founded with the vision of creating a community where individuals can explore and enhance their spiritual practices, we offer various resources, workshops, and teachings aimed at nurturing the soul and mind. Our dedicated team is committed to guiding you through a transformative journey, helping you discover profound insights and achieve a balanced and fulfilling life.
              </p>
              <img src={Img1} alt="About Us Visual" className="center-card-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Mission, Vision, Values */}
      <div className="bg-abt">
        <div className="section" ref={missionCardsRef}>
          <div className="Abt-card-container">
            <div className={`Abt-card reveal ${visibleElements.missionCards ? 'visible' : ''}`}>
              <h2>Mission</h2>
              <p>Our mission is to create a sanctuary for those seeking peace and spiritual enlightenment. We strive to empower individuals through community engagement, educational programs, and personal mentorship. By fostering a supportive environment, we aim to inspire positive change and help individuals cultivate a deeper connection with their inner selves and the world around them.</p>
            </div>
            <div className={`Abt-card reveal ${visibleElements.missionCards ? 'visible' : ''}`}>
              <h2>Vision</h2>
              <p>Our vision is a world where every individual experiences profound inner peace and harmony. We envision a global community where spiritual growth and personal fulfillment are accessible to all, transcending cultural and geographical boundaries. Through our initiatives, we aspire to be a beacon of hope and a catalyst for positive transformation.</p>
            </div>
            <div className={`Abt-card reveal ${visibleElements.missionCards ? 'visible' : ''}`}>
              <h2>Values</h2>
              <p>At the heart of our organization are core values that guide us in everything we do. We champion empathy, embracing kindness and understanding while providing a compassionate support system for everyone who seeks it. We celebrate the strength found in community, building vibrant, interconnected networks that uplift and inspire.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Team Members */}
      <div className="bg-abt">
        <div className="section" ref={teamMembersRef}>
          <div className="team-card">
            <div className="team-grid">
              <div className={`team-member reveal ${visibleElements.teamMembers ? 'visible' : ''}`}>
                <img src={Img2} alt="Team Member 1" className="team-img" />
                <h2>Hetvi Modi</h2>
                <p>I am pursuing my B.Tech in Computer Science and Engineering (CSE) at SVNIT. Passionate about web development, I aim to create innovative and impactful digital experiences through my technical expertise and creativity.</p>
                <div className='icon-container'>
                  <a href="https://www.linkedin.com/in/hetvibmodi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                    <FaLinkedin className="icons" color="white" size="3.3rem" />
                  </a>
                  <a href="https://github.com/Hetvimodi6204" target="_blank">
                    < FaGithubSquare className="icons" color="white" size="3.3rem"></ FaGithubSquare >
                  </a>
                  <a href="https://wa.me/918905105021" target="_blank">
                    <FaWhatsappSquare className="icons" color="white" size="3.3rem"></FaWhatsappSquare>
                  </a>


                </div>
              </div>
              <div className={`team-member reveal ${visibleElements.teamMembers ? 'visible' : ''}`}>
                <img src={Img3} alt="Team Member 2" className="team-img" />
                <h2>Kaushal Pawar</h2>
                <p>
                  I am pursuing my B.Tech ECE at SVNIT. Passionate about app development, I aim to innovate and create impactful digital solutions by blending my technical knowledge with my enthusiasm for technology.
                </p>
                <div className='icon-container'>
                  <a href="https://www.linkedin.com/in/kaushalapawar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                    <FaLinkedin className="icons" color="white" size="3.3rem" />
                  </a>
                  <a href="https://github.com/KaushalPawar14" target="_blank">
                    < FaGithubSquare className="icons" color="white" size="3.3rem"></ FaGithubSquare >
                  </a>
                  <a href="https://wa.me/919106368224?text=Your%20pre-filled%20message" target="_blank">
                    <FaWhatsappSquare className="icons" color="white" size="3.3rem"></FaWhatsappSquare>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
