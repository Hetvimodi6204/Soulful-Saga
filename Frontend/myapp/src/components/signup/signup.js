import React, { useState } from 'react';
import "./signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js"
import SignupImage from '../Images/cutout.png'; 
const Signup = () => {
    const navigate = useNavigate(); // Assign the navigate function
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({
            ...user,
            [name]: value
        });
    };

    const signup = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/signup", {
                name,
                email,
                password
            })
            .then(res => {
                console.log("Signup successful:", res.data); // Log the response data
                alert("Signup successful!"); // Example: Show success message
                navigate("/"); // Redirect to home page after successful signup
            })
            .catch(err => {
                console.error("Error signing up:", err);
                if (err.response && err.response.status === 400) {
                    alert(err.response.data.message); // Show specific error message from backend
                } else {
                    alert("Error signing up. Please try again."); // Generic error message
                }
            });
        } else {
            alert("Invalid Input. Please fill all fields and ensure passwords match.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="signup">
                <div className="signup-left">
                    <div className="create">
                        <h1 className="create-heading">Create Account</h1>
                        <p className="create-p">to get started now!</p>
                    </div>
                    <div className="signup-form">
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                        />
                        <input
                            type="email"
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
                            placeholder="Enter your Password"
                        />
                        <input
                            type="password"
                            name="reEnterPassword"
                            value={user.reEnterPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your Password"
                        />
                        <div className="button" onClick={signup}>
                            Signup
                        </div>
                        <div className="signup-or">or</div>
                        <div className="button" onClick={() => navigate("/login")}>
                            Login
                        </div>
                    </div>
                </div>
                <div className="signup-image">
                    <img src={SignupImage} alt="Promotional" />
                </div>
            </div>
        </>
    );
};

export default Signup;
