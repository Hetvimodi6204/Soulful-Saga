import React from 'react';
import "./blogs.css";
import influencer2 from '../Images/I1.jpeg';
import influencer1 from '../Images/I2.jpeg';
import influencer3 from '../Images/I3.jpeg';
import influencer4 from '../Images/I4.jpeg';
import influencer5 from '../Images/I5.jpeg';
import influencer6 from '../Images/I6.jpeg';
import { FaFacebook, FaInstagram,FaYoutube} from "react-icons/fa"
const Blogs = () => {
  return (
    <>
    <div className="blog-container">
      {/* First grid section */}
      <div className="grid-section">
        <div className="left-column">
          <div className="main-article">
            <h2>Main Blog Post Title 1</h2>
            <p>Main blog post content goes here...</p>
          </div>
        </div>
        <div className="right-column">
          <div className="grid-container">
            <div className="grid-item">
              <h3>Video Title 1</h3>
              <img src="video1.jpg" alt="Video 1" />
              <p>Description of Video 1...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 2</h3>
              <img src="video2.jpg" alt="Video 2" />
              <p>Description of Video 2...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 3</h3>
              <img src="video3.jpg" alt="Video 3" />
              <p>Description of Video 3...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 4</h3>
              <img src="video4.jpg" alt="Video 4" />
              <p>Description of Video 4...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second grid section */}
      <div className="grid-section">
        <div className="left-column">
          <div className="main-article">
            <h2>Main Blog Post Title 2</h2>
            <p>Main blog post content goes here...</p>
          </div>
        </div>
        <div className="right-column">
          <div className="grid-container">
            <div className="grid-item">
              <h3>Video Title 5</h3>
              <img src="video5.jpg" alt="Video 5" />
              <p>Description of Video 5...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 6</h3>
              <img src="video6.jpg" alt="Video 6" />
              <p>Description of Video 6...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 7</h3>
              <img src="video7.jpg" alt="Video 7" />
              <p>Description of Video 7...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 8</h3>
              <img src="video8.jpg" alt="Video 8" />
              <p>Description of Video 8...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add more grid sections as needed */}
      <div className="grid-section">
        <div className="left-column">
          <div className="main-article">
            <h2>Main Blog Post Title 2</h2>
            <p>Main blog post content goes here...</p>
          </div>
        </div>
        <div className="right-column">
          <div className="grid-container">
            <div className="grid-item">
              <h3>Video Title 5</h3>
              <img src="video5.jpg" alt="Video 5" />
              <p>Description of Video 5...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 6</h3>
              <img src="video6.jpg" alt="Video 6" />
              <p>Description of Video 6...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 7</h3>
              <img src="video7.jpg" alt="Video 7" />
              <p>Description of Video 7...</p>
            </div>
            <div className="grid-item">
              <h3>Video Title 8</h3>
              <img src="video8.jpg" alt="Video 8" />
              <p>Description of Video 8...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="influencer-section">
          <h2>Influencers</h2>
          <div className="influencer-row">
            <div className="influencer-profile">
              <img src={influencer1} alt="Influencer 1" />
              <h3>Chitralekhaji</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
            <div className="influencer-profile">
              <img src={influencer5} alt="Influencer 2" />
              <h3>Chanchalapati Das</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
            <div className="influencer-profile">
              <img src={influencer3} alt="Influencer 3" />
              <h3>Amogh Lila Prabhu</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
            <div className="influencer-profile">
              <img src={influencer4} alt="Influencer 4" />
              <h3>Sampati Das</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
            <div className="influencer-profile">
              <img src={influencer2} alt="Influencer 5" />
              <h3>Jaya Kishori</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
            <div className="influencer-profile">
              <img src={influencer6} alt="Influencer 6" />
              <h3>Premananda Das</h3>
              <div className="social-icons">
              <a href="#" target="_blank">
                                    <FaYoutube className="icons"></FaYoutube>
                                </a>
                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Blogs;
