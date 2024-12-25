import React, { useState } from 'react';
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/navbar.js";
import SignupImage from '../Images/signup-cutout.png'; 

const Signup = () => {
    const navigate = useNavigate(); // Assign the navigate function
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const signup = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const { name, email, password, reEnterPassword } = user;

        if (name && email && password && (password === reEnterPassword)) {
            fetch("https://soulful-saga-back1.vercel.app/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            .then(async (res) => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Error signing up");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Signup successful:", data);
                alert("Signup successful!");
                navigate("/"); // Redirect to home page after successful signup
            })
            .catch((err) => {
                console.error("Error signing up:", err.message);
                alert(err.message); // Display the error message
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
                    <form className="signup-form" onSubmit={signup}>
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
                        <button className="button" type="submit">
                            Signup
                        </button>
                    </form>
                    <div className="signup-or">or</div>
                    <div className="button" onClick={() => navigate("/login")}>
                        Login
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
