import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage/homepage';
import Books from "./components/books/books.js";
import AboutUs from "./components/Aboutus/aboutus.js"
import Blogs from "./components/Blogs/blogs.js";
import Login from './components/login/login';
import Signup from './components/signup/signup';
import ContactUs from './components/contact/contact';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar.js';

function App() {
  const [user, setLoginUser] = useState({});
  
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className="content-wrap">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/books" element={<Books />} />
            <Route exact path="/blogs" element={<Blogs/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
