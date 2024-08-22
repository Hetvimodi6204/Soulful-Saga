import React from 'react'
import "./footer.css";
import emailjs from 'emailjs-com';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
const Footer = () => {
    return (
        <>
            <footer>
                <div className="container grid grid-four-column">
                    < div className="footer-newsletter">
                        <image></image>
                        <p>Subscribe to our newsletter for the latest updates on new features and product releases.</p>
                        <form action="#">
                            <input
                                type="email"
                                required autoComplete="off"
                                placeholder="email" />
                            <input type="submit" value="subscribe" />
                        </form>
                        <p>© 2023 SoulfulSaga. All Rights Reserved.</p>
                    </div>

                    {/* 2nd col  */}
                    < div className="footer-explore">
                        <h2>Explore</h2>
                        <p1>Home</p1>
                        <p1>About</p1>
                        <p1>Books</p1>
                        <p1>Lectures</p1>
                        <p1>Blogs</p1>
                    </div>
                    {/* 3rd col  */}
                    < div className="footer-connect">
                        <h2>Connect</h2>
                        <p1>Login</p1>
                        <p1>Signup</p1>
                        <p1>FAQs</p1>
                        <p1>Contact Us</p1>
                        <p1>Subscribe to Newsletter</p1>
                    </div>
                    {/* 4th col  */}
                    < div className="footer-followus">
                        <h2>Follow Us</h2>
                        <div className="footer-icons">
                            <div className="facebook">
                                <a href="#" target="_blank">
                                    <FaFacebook className="icons"></FaFacebook>
                                </a>
                                <p1>Facebook</p1>
                            </div>
                            <div className="instagram">
                                <a href="#" target="_blank">
                                    <FaInstagram className="icons"></FaInstagram>
                                </a>
                                <p1>Instagram</p1>
                            </div>
                            <div className="LinkedIn">
                                <a href="#" target="_blank">
                                    <FaLinkedin className="icons"></FaLinkedin>
                                </a>
                                <p1>LinkedIn</p1>
                            </div>
                            <div className="Twitter">
                                <a href="#" target="_blank">
                                    <FaTwitter className="icons"></FaTwitter>
                                </a>
                                <p1>X</p1>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer
