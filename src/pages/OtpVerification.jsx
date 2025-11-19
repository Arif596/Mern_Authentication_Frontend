import React, { useContext, useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../Store/Context";

const OtpVerification = () => {
  const { email, phone } = useParams();
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);

  // OTP state: array of 5 empty strings
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^\d$/.test(value)) return; // only digits
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (index < otp.length - 1) {
      document.getElementById(`otp-input${index + 1}`).focus();
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input${index - 1}`).focus();
    }
  };

  // Handle OTP form submission
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOTP = otp.join(""); // join array to string
    const data = { email, phone, otp: enteredOTP };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/otp-verification",
        data,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="otp-verification-page">
      <div className="otp-container">
        <h1>OTP Verification</h1>
        <p>Enter the 5-digit OTP sent to your registered Email or Phone</p>
        <form onSubmit={handleOtpVerification} className="otp-form">
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                id={`otp-input${index}`}
                value={digit}
                className="otp-input"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button  className="verify-button" type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
