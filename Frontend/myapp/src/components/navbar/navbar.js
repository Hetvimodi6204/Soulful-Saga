import { useState } from "react"
import React from "react";
import "./navbar.css"
import HomePage from "../homepage/homepage.js";
import Logo from "../Images/logo.png";
import Login from '../login/login.js';
import Signup from '../signup/signup';
import Aboutus from "../Aboutus/aboutus.js";
import Books from "../books/books.js";
import Blogs from "../Blogs/blogs.js";
import FAQs from "../faqs/faqs.js";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(true);

    const handleMenuToggle = () => {
        setShowMediaIcons(!showMediaIcons);
    };
    return (
        <>
            <nav className={`main-nav ${showMediaIcons ? "menu-open" : "menu-closed"}`}>
                <img src={Logo} alt="Logo" className="logo-img" />
                <div className="logo">
                    <h2>
                        <span>S</span>oulful
                        <span>S</span>aga    
                    </h2>
                </div>
                <div className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        {/* <li>
                <a href="#">Lectures</a>
            </li> */}
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/blogs">Blogs</Link>
                        </li>
                        {/* <li>
                <a href="#">Contact Us</a>
            </li> */}
                        <li>
                            <a href="#faqs">FAQs</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {/* Login and signup button */}
                    <div className="login-signup-btn">
                        <ul className="btn-logo">
                            <li>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup">
                                    <button>Signup</button>
                                </Link>
                            </li>
                        </ul>
                        {/* Hamburger menu */}
                        <div className="hamburger-menu" onClick={handleMenuToggle}>
                            {showMediaIcons ? (
                                <RxCross2 color="white" />
                            ) : (
                                <GiHamburgerMenu color="white" />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
