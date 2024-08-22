import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './photogallery.css';

const images = [
  { src: require('../Images/p0.jpg'), alt: 'Image 1' },
  { src: require('../Images/p1.png'), alt: 'Image 2' },
  { src: require('../Images/p2.png'), alt: 'Image 3' },
  { src: require('../Images/p3.png'), alt: 'Image 4' },
  { src: require('../Images/p4.jpg'), alt: 'Image 5' },
  { src: require('../Images/p5.jpg'), alt: 'Image 6' },
  { src: require('../Images/p6.jpg'), alt: 'Image 7' },
  { src: require('../Images/p7.jpg'), alt: 'Image 4' },
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

  const headerStyle = {
    fontFamily: "'Julius Sans One', sans-serif",
  };

  const paragraphStyle = {
    fontFamily: "'Raleway', sans-serif",
  };

  return (
    <div className="card">
      <div className="three-d-carousel">
        <div className="header">
          <h1 style={headerStyle}>Photogallery</h1>
          <p style={paragraphStyle}>Join our live mantra chanting sessions to experience inner peace and spiritual connection.</p>
        </div>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
