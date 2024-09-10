import React, { useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";
import LoginImage from '../Images/login-cutout.png';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = (e) => {
        e.preventDefault();

        fetch("http://localhost:9002/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: 'include',
        })
        .then(async (res) => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error logging in");
            }
            return res.json();
        })
        .then((data) => {
            if (data.token) {
                document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
                console.log("Token saved to cookie:", data.token);
                alert("Login successful!");
                navigate("/"); // Redirect to home page after successful login
            } else {
                alert("Login failed: No token received.");
            }
        })
        .catch((err) => {
            console.error("Error logging in:", err.message);
            if (err.message === "Invalid credentials. Please try again.") {
                alert(err.message); // Display specific error message
            } else {
                alert("Error logging in. Please try again."); // Generic error message
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
                    <form className="login-form" onSubmit={login}>
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
                            placeholder="Enter your password"
                        />
                        <button className="button" type="submit">
                            Login
                        </button>
                    </form>
                    <div className="login-or">or</div>
                    <div className="button" onClick={() => navigate("/signup")}>
                        Signup
                    </div>
                </div>
                <div className="login-image">
                    <img src={LoginImage} alt="Promotional" />
                </div>
            </div>
        </>
    );
};

export default Login;
