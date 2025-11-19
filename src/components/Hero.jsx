import React, { useContext } from "react";
import "../styles/Hero.css";
import heroImage from "../assets/img1.png";
import { Context } from "../Store/Context";
import Home from "../pages/Home";
const Hero = () => {
  const { user } = useContext(Context);
  return (
    <>
      <div className="hero-section">
        <img src={heroImage} alt="hero-image" />
        <h4>Hello, {user ? user.name : "Developer"}</h4>
        <h1>Welcome to MERN Auth Tutorial</h1>
        <p>
          In this tutorial you are going to learn complete authentication using
          MERN stack while learning OTP verification with Twilio and Nodemailer.
        </p>
        <Home/>
      </div>
    </>
  );
};

export default Hero;
