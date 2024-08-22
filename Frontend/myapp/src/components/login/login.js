import React, { useState } from 'react';
import "./login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";

const Login = () => {
    const navigate = useNavigate(); // Correctly assign navigate here

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
                console.log("Login successful:", res.data);
                alert("Login successful!"); // Example: Show success message
                navigate("/"); // Redirect to dashboard or appropriate page
            })
            .catch(err => {
                console.error("Error logging in:", err);
                if (err.response && err.response.status === 404) {
                    alert("Invalid credentials. Please try again."); // Show specific error message from backend
                } else {
                    alert("Error logging in. Please try again."); // Generic error message
                }
            });
    };

    return (
            <div className="login">
                <Navbar/>
                <h1 className="login-heading">Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your password" />
                <div className="button" onClick={login}>Login</div>
                <div className="login-or">or</div>
                <div className="button" onClick={() => navigate("/signup")}>Signup</div>
            </div>
    );
};

export default Login;
