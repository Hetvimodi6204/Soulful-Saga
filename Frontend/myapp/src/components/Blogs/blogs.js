import React from 'react';
import "./blogs.css";
import influencer2 from '../Images/I1.jpeg';
import influencer1 from '../Images/I2.jpeg';
import influencer3 from '../Images/I3.jpeg';
import influencer4 from '../Images/I4.jpeg';
import influencer5 from '../Images/I5.jpeg';
import influencer6 from '../Images/I6.jpeg';
import cat1 from '../Images/cat1.png';
import cat2 from '../Images/cat2.png';
import cat3 from '../Images/cat3.jpg';
import cat4 from '../Images/cat4.jpg';
import cat5 from '../Images/cat5.png';
import vid11 from "../Images/vid11.jpg";
import vid12 from "../Images/vid12.jpg";
import vid13 from "../Images/vid13.jpg";
import vid14 from "../Images/vid14.jpg";
import vid31 from "../Images/vid31.jpg";
import vid32 from "../Images/vid32.jpg";
import vid33 from "../Images/vid33.jpg";
import vid34 from "../Images/vid34.jpg";
import vid21 from "../Images/vid21.jpg";
import vid22 from "../Images/vid22.jpg";
import vid23 from "../Images/vid23.jpg";
import vid24 from "../Images/vid24.jpg";
import vid41 from "../Images/vid41.jpg";
import vid42 from "../Images/vid42.jpg";
import vid43 from "../Images/vid43.jpg";
import vid44 from "../Images/vid44.jpg";
import vid51 from "../Images/vid51.jpg";
import vid52 from "../Images/vid52.jpg";
import vid53 from "../Images/vid53.jpg";
import vid54 from "../Images/vid54.jpg";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
const Blogs = () => {
  return (
    <>
      <div className="blog-container">
        {/* First grid section */}
        <h2 className='cat-heading'>Bhagavad Gita Teachings</h2>
        <div className="grid-section">
          <div className="left-column">
            <div className="main-article">
            <img src={cat1} className='cat-image'></img>
            </div>
          </div>
          <div className="right-column">
            <div className="grid-container">
              <div className="grid-item">
                <div className="video-thumbnail">
                  <a href="https://youtu.be/0lVqd37G_8k?si=nEOqHJhXCSrRXWj_" target="_blank">
                    <img src={vid11} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Who is Krishna? Bhagavad Gita</h3>
                </div>
              </div>

              <div className="grid-item">
                <div className="video-thumbnail">
                  <a href='https://youtu.be/dsYE5k_RqGk?si=PdLxE_TOZjxJvg26\' target="_blank">
                    <img src={vid12} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Essence of Bhagavad Gita</h3>
                </div>
              </div>

              <div className="grid-item">
                <div className="video-thumbnail">
                  <a href='https://youtu.be/_07qB7XI6FQ?si=R6nlsweMJaAY7RF7' target='_blank'>
                    <img src={vid13} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Why God gives pain even after knowing everything?</h3>
                </div>
              </div>

              <div className="grid-item">
                <div className="video-thumbnail">
                  <a href='https://youtu.be/0rxu1e2sDNw?si=wZNFIadHb2kErOqa' target='_blank'>
                    <img src={vid14} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Last message of Bhagavad Gita</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second grid section */}
         <h2 className='cat-heading'>Crisp and meaningful Lessons</h2>
        <div className="grid-section">
          <div className="left-column">
            <div className="main-article">
              <img src={cat2} className='cat-image'></img>
            </div>
          </div>
          <div className="right-column">
            <div className="grid-container">
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://www.youtube.com/live/4S-62DnS8uE?si=JOcGvAAI4TU1jfwp" target="_blank">
                    <img src={vid21} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>How to handle anger? Srimad Bhagavatam</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://www.youtube.com/live/24a1_1dRJho?si=eHul5nvT0AKSU0Ia" target="_blank">
                    <img src={vid22} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>How to make your life everyday ever fresh?</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/bpXAJdRP-d4?si=nbH-ABo5qgmJ_ki5" target="_blank">
                    <img src={vid23} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>What is our true identity?</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/JFnXiedMihc?si=Wwzdkp-bdjWb41Qc" target="_blank">
                    <img src={vid24} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>How to develop attraction for Krishna?</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*third section */}
        <h2 className='cat-heading'>Effective learnings for beginners</h2>
        <div className="grid-section">
          <div className="left-column">
            <div className="main-article">
            <img src={cat3} className='cat-image'></img>
            </div>
          </div>
          <div className="right-column">
            <div className="grid-container">
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/ceM2Ejc4Pjw?si=KaUqnqLxLFB7Rfqt" target="_blank">
                    <img src={vid31} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Does really God exist?</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/TH4qyx0Iz-E?si=JEsMknRJlXjl6MhB" target="_blank">
                    <img src={vid32} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>If God exists, then show me..</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/YrACey-tAT8?si=hpHr48JiVk5LStbC" target="_blank">
                    <img src={vid33} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>What is real purpose of life?</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/zDkS4HcbIsg?si=TOkwSv3qYdnSLnv4" target="_blank">
                    <img src={vid34} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Why God has made so many religions?</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth section */}
        <h2 className='cat-heading'>Enlightenment from Short Films</h2>
        <div className="grid-section">
          <div className="left-column">
            <div className="main-article">
            <img src={cat4} className='cat-image'></img>
            </div>
          </div>
          <div className="right-column">
            <div className="grid-container">
              <div className="grid-item">
                <div className="video-thumbnail">
                  <a href="https://youtu.be/ScrnS9tTKR4?si=IQsoV2JWVfNT23Hr" target="_blank">
                    <img src={vid41} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Disease of Social Media addiction</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/_bYegIu-7xs?si=KQ_FgsEq32SxcrTA" target="_blank">
                    <img src={vid42} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Psycho - a life changing short film</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/lZoAQY2b8Dc?si=lYc6k7HlYoFEE2bJ" target="_blank">
                    <img src={vid43} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Vegetarian v/s Non-vegetarian</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/FA-57UTO-yg?si=A_9Kl7MCe4G5fqAh" target="_blank">
                    <img src={vid44} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Impact of Bollywood on us</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* fifth section  */}
        <h2 className='cat-heading'>Divine melodies : Music for Soul</h2>
        <div className="grid-section">
          <div className="left-column">
            <div className="main-article">
            <img src={cat5} className='cat-image'></img>
            </div>
          </div>
          <div className="right-column">
            <div className="grid-container">
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/O5dQwIz5Naw?si=gJWVNvKwvcKdix6o" target="_blank">
                    <img src={vid51} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Hare Krishna - Soulful kirtan</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/I3uQI1HJRt0?si=Wi2lU0_K0gjiHEeS" target="_blank">
                    <img src={vid52} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Jay Jay Radhe, Shyaam, Vrindavan dham</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/Nmzgh4J76vk?si=RveZMdiUuuK4ibdY" target="_blank">
                    <img src={vid53} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Vaishnav Bhajan by Lokanath Swami</h3>
                </div>
              </div>
              <div className="grid-item">
              <div className="video-thumbnail">
                  <a href="https://youtu.be/vw7mFNsVeY8?si=NYgB8tvwTeAEvJnf" target="_blank">
                    <img src={vid54} alt="Video 1" />
                    <div className="thumbnail-overlay">
                      <span>Watch on YouTube</span>
                    </div>
                  </a>
                </div>
                <div className="video-details">
                  <h3>Bhajaman Radhe Govind special kirtan</h3>
                </div>
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
