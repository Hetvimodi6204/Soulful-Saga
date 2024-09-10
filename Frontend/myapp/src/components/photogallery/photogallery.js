import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './photogallery.css';

const images = [
  { src: require('../Images/p0.jpg'), alt: 'Yoga & Meditation' },
  { src: require('../Images/p1.jpg'), alt: 'Book Reading' },
  { src: require('../Images/p2.jpg'), alt: 'Prayers' },
  { src: require('../Images/p3.jpg'), alt: 'Mantra Chanting' },
  { src: require('../Images/p5.jpg'), alt: 'Divine Invitation' },
  { src: require('../Images/p6.jpg'), alt: 'Divine Beauty' },
  { src: require('../Images/p7.jpg'), alt: 'Rejoice in God' },
  { src: require('../Images/p8.jpg'), alt: 'Faith’s Key' },
  { src: require('../Images/p9.jpg'), alt: 'Service and God' },
];

const ThreeDCarousel = () => {
  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="card">
      <div className="three-d-carousel">
        <div className="header">
          <h1>Photogallery</h1>
          <p>Join our live mantra chanting sessions to experience inner peace and spiritual connection.</p>
        </div>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <div className="gradient-background">
                <img src={image.src} alt={image.alt}/>
                <div className="image-text">
                  <h3>{image.alt}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
