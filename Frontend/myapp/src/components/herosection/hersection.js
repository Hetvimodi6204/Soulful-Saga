import React from 'react';
import HeroVid from '../Images/intro.mp4';
import './herosection.css';

const Heroimg = ({ onExploreClick }) => (
  <div className="hero-container">
    <video className="hero-video" autoPlay loop muted>
      <source src={HeroVid} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="hero-content">
      <h1>Welcome to <span>SoulfulSaga</span></h1>
      <p>Embark on a journey of spiritual enlightenment with us</p>
      <div className="buttons">
        <button onClick={onExploreClick} className="btn btn-secondary">Explore Now</button>
      </div>
    </div>
  </div>
);

export default Heroimg;
