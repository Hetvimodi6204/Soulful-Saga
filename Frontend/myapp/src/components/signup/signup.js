import React, { useState } from 'react';
import "./signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js"

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
        <div className="signup">
            <Navbar/>
            <h1 className="signup-header">Signup</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} />
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={handleChange} />
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange} />
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange} />
            <div className="button" onClick={signup}>Signup</div>
            <div className="signup-or">or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>
    );
};

export default Signup;
