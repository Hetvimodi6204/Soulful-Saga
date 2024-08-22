import React from 'react';
import "./features.css";
import image1 from "../Images/lectures.jpg";
import image2 from "../Images/mantra.png";
import image3 from "../Images/community.jpg";

const Data = [
  {
    id: 1,
    image: image1,
    title: "Live Lectures",
    description: "Join our live lectures to deepen your spiritual understanding",
  },
  {
    id: 2,
    image: image2,
    title: "Mantra Chanting",
    description: "Experience the power of mantra chanting for inner peace and harmony",
  },
  {
    id: 3,
    image: image3,
    title: "Community Discussions",
    description: "Engage in meaningful discussions with our spiritual community",
  }
];

const Features = () => {
  return (
    <div className="features-container">
      <div className="gradient-bg">
        <h2 className="heading">Our Services</h2>
        <div className="mainContainer">
          {Data.map(({ id, image, title, description }) => (
            <div key={id} className="box">
              <div className="card">
                <div className="image">
                  <img src={image} alt={title} />
                </div>
                <div className="desc">
                  <h1>{title}</h1>
                  <p>{description}</p>
                </div>
              </div>
              <button className="bton">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
