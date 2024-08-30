import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";
import LoginImage from '../Images/cutout.png'; 
const Login = () => {
    const navigate = useNavigate(); 

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };
const login = () => {
    axios.post("http://localhost:9002/login", user)
        .then(res => {
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                console.log("Token saved to localStorage:", res.data.token); 
                alert("Login successful!");
                navigate("/"); 
            } else {
                alert("Login failed: No token received.");
            } 
        })
        .catch(err => {
            console.error("Error logging in:", err);
            if (err.response && err.response.status === 404) {
                alert("Invalid credentials. Please try again."); 
            } else {
                alert("Error logging in. Please try again."); 
            }
        });
};

    return (
        <>
            <Navbar />
            <div className="login">
                <div className="login-left">
                    <div className="welcome">
                        <h1 className="welcome-heading">Welcome Back!</h1>
                        <p className="welcome-p">Please enter your details to sign in</p>
                    </div>
                    <div className="login-form">
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        <div className="button" onClick={login}>
                            Login
                        </div>
                        <div className="login-or">or</div>
                        <div className="button" onClick={() => navigate("/signup")}>
                            Signup
                        </div>
                    </div>
                </div>
                <div className="login-image">
                    <img src={LoginImage} alt="Promotional" />
                </div>
            </div>
        </>
    );
}    
export default Login;
